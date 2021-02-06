---
title: Blog in GitPage
date: 2021-02-06  
tags:  
---

通过GitPage搭建博客多次，每次都有新感觉（大雾）。  

## 问题分析  
问题是我想将网站的静态页面文件和博客构建源码文件分开提交，如何解决？  

## 解决思路  

### ~~方案一：双仓库~~  
1. 建立两个仓库：blogname.github.io和blogsource，分别存放博客静态页面和博客搭建源码。  
2. 本地与之对应建立两个目录并与远程仓库关联。  
3. 实际操作时，在blogsource目录中执行hexo基本操作，生成博客后，将public文件夹中的内容拷贝到本地的blogname.github.io仓库中，最后将两个目录都同步到远程仓库。  
这种方法容易理解，但是写完博客后的拷贝工作是繁琐的事，于是想到了下面这个方法。  

### ~~方案二：双仓库改进版~~  
1. 考虑到每次生成的博客静态页面都是在public目录下，将public\目录关联到远程仓库blogname.github.io，方案一中的本地静态页面仓库可以弃用了。  
2. 每次生成静态页面后，先将blogsource\提交到远端仓库，再进入public\目录把它也提交到与之对应的远端仓库，这样就不用再来回拷贝静态页面文件了。  

### ~~方案三：双分支（未成功）~~  
1. 在博客仓库上建立两个分支: master分支与 source 分支，master分支部署静态页面。source分支用以提交博客源码。  
2. 克隆远程博客仓库，本地切换到新建的source分支  
3. 进入新建的临时文件夹，使用hexo init初始化，然后将临时文件夹中的内容拷贝到空博客仓库里,最后将本地仓库提交到远程source分支。至此，博客的source源码分支构建成功  
4. 执行 hexo g 生成静态页面，将仓库中的(.git/ & .gitignore) 拷贝到public\目录里，进入该目录，切换到新建的master分支，将更新提交到远程master分支。至此，博客的master静态页面分支构建成功。  
但是，这只在博客刚搭建好，第一次提交的时候管用！因为Git的分支是独立的，虽然每次source分支执行hexo g会更新public\目录的内容，但是在切换到master分支后，\publib目录的内容也会随之切换到master版本，也就是未更新版本。即：master分支中的public\的内容不会随着source分支改变其中内容而改变，这也正是Git版本管理的特点之一，所以Git的分支不太适合「子文件夹」这种需求（需要git checkout --orphan master和git submodule结合起来使用，有些麻烦就没有尝试了，另外SVN的分支模型可能更符合这种需求描述）。  
如果使用这种方法，每次都要：先切换到source分支，拷贝public\中的内容，然后进入public\文件夹，切换到master分支，将刚才拷贝的内容覆盖当前目录（相当麻烦！）。  

### ~~方案四：双分支 + hexo-deployer-git~~  
沿着方案三的思路，目前的难点在于如何同步public\中的内容，我们可以通过使用hexo-deployer-git插件加以解决。具体步骤如下（对于本地hexo环境的搭建这里不做赘述，注意npm安装时添加`--save`参数）：  

#### 第一步  
在Github上新建一个仓库，命名为username.github.io，不添加README文件，不添加gitignore文件，添加Apache License 2.0。  
创建完成后，在仓库的设置中设置开启gitpage以及强制https。  
最后，将仓库克隆到本地。  

#### 第二步  
首先，在桌面新建一个临时文件夹blog\，进入文件夹，执行hexo init。修改生成的_config.yml文件的deploy项：  
```  
deploy:  
  type: git   
  repo: https://github.com/username/blogname.github.io  
  branch: master  
```  
然后，克隆仓库到本地，进入仓库，切换到新建的source分支：  
```  
git checkout -b source  
```  
之后，将blog\中所有内容拷贝到本地仓库中，将更新提交到远程source分支。  
至此，博客源码部署完成。  

#### 第三步  
确认当前本地仍处于source分支。  
1. 在仓库中执行`hexo g`，生成静态页面  
2. 安装hexo-deployer-git:`npm install hexo-deployer-git --save`  
3. 执行`hexo d`,将静态页面部署到远程仓库的master分支。

至此，博客静态页面部署完成。  

#### 第四步  
在上述操作都完成后，把github中远程博客仓库的默认分支改为source，这样以后源码提交时就不用考虑远程切换到source分支了。  

#### 重新部署  
如果需要在新的机器上重新部署本地环境，需要进行以下步骤：  
1. 配置hexo基本环境（安装Node.js、Git、hexo-deployer-git插件）  
2. 克隆远程仓库  
3. 切换到source分支，安装hexo-deployer-git插件  
4. 执行`hexo new 'article'`写文章，写完后push到远程source分支  
5. 执行`hexo g -d`，生成静态页面并推送到远程仓库的master分支  

### 方案五：双分支 + Travis CI
将CI/CD（持续集成和持续部署）应用到GitPage中，可以通过脚本自动部署更新博客，提升任务效率。  
具体步骤根据[官网教程](https://hexo.io/zh-cn/docs/github-pages.html)即可，操作时注意两点：  
1. travis脚本中的分支名注意修改为main
2. `.travis.yml`提交到远端后，CI就会触发，需要时间更新内容，可以在travis-ci官网查看进度
3. 如果 commit 不想让 Travis 构建，那么就在 commit message 里加上ci skip即可:`git commit -m "[ci skip] first commit"
`。

## 总结  
- `git add -参数`  
	- `git add *`中\*不是Git的一部分,它是一个由shell解释的通配符，该命令意味着添加当前目录中的所有文件，但以点开头的文件除外。  
	- `git add .`在shell中没有特殊的意义，因此Git递归地添加了整个目录，包含了名字以点开头的文件。对仓库的增、改敏感。  
	- `git add -A` 对仓库的增、删、改都敏感。  
	- `git add -u` 对仓库的删、改敏感  
- Git的各分支独立，若要实现子文件夹的管理，最好使用多仓库，不宜使用多分支。或者使用SVN分支管理。  
- 官方文档对于如何实现以及使用的描述更加详细（如[Hexo部署文档](https://hexo.io/zh-cn/docs/deployment)），在有官方文档且能读懂的情况下，官方文档优先，然后再考虑博客文档。 

