---
title: DenseBox代码解析  
date: 2019-08-29 21:08:39  
tags:  
---

距离上次更新博客又很久了。前段时间照着github上的代码复现了下DenseBox，有所收获记录一下。  

# DenseBox代码整体结构  

* densebox/  
	* \_\_init\_\_.py：将文件夹变为一个Python模块  
	* DenseBox.py：网络结构相关代码  
	* DenseBoxDataset.py：数据集加载相关代码  
* train.py：构建网络->读取数据->训练网络  
* test.py：构建网络->读取数据->测试数据  

## densebox/\_\_init\_\_.py解析  

densebox文件夹下，__init__文件的内容为:  
```  
from .DenseBoxDataset import DenseBoxDataset  
from .DenseBox import DenseBox  
__all__ = ['DenseBoxDataset', 'DenseBox']  
```  
这段代码的作用是使得densebox文件夹变为一个模块，换一个角度来说，就是提升了包的导入权限，只要在__all__中声明的内容，可以直接在上一层目录中导入，如train.py文件的开头：  
```  
from densebox import DenseBoxDataset  
from densebox import DenseBox  
```  
如果使用`from densebox import *`，则会把注册在__all__列表中的子模块和子包导入到当前作用域中来。  

## densebox/DenseBox.py解析  

DenseBox.py用于构建网络结构，首先定义模型结构`class DenseBox(torch.nn.Module)`，然后实现`__init__`函数和`forward`函数。  
* \_\_init\_\_(self, vgg19)  

	__init__函数用于初始化网络结构，它继承父类的__init__函数：`super(DenseBox, self).__init__()`  

	参数vgg19用于初始化DenseBox初始结构，因为DenseBox的主干网络是基于vgg19的：`feats = vgg19.features._modules`  

	然后依次添加卷积、池化等网络结构：  
	```  
	# ----------------- Conv1  
	self.conv1_1_1 = copy.deepcopy(feats['0'])  # (0)  
	self.conv1_1_2 = copy.deepcopy(feats['1'])  # (1)  
	self.conv1_1 = nn.Sequential(  
		self.conv1_1_1,  
		self.conv1_1_2  
	)  # conv_layer1  

	#...(中间结构省略)...  

	# ----------------- Conv4  
	self.conv4_1_1 = copy.deepcopy(feats['19'])  # (19)  
	self.conv4_1_2 = copy.deepcopy(feats['20'])  # (20)  
	self.conv4_1 = nn.Sequential(  
		self.conv4_1_1,  
		self.conv4_1_2  
	)  # conv_layer9  

	self.conv4_2_1 = copy.deepcopy(feats['21'])  # (21)  
	self.conv4_2_2 = copy.deepcopy(feats['22'])  # (22)  
	self.conv4_2 = nn.Sequential(  
		self.conv4_2_1,  
		self.conv4_2_2  
	)  # conv_layer10  

	self.conv4_3_1 = copy.deepcopy(feats['23'])  # (23)  
	self.conv4_3_2 = copy.deepcopy(feats['24'])  # (24)  
	self.conv4_3 = nn.Sequential(  
		self.conv4_3_1,  
		self.conv4_3_2  
	)  # conv_layer11  

	self.conv4_4_1 = copy.deepcopy(feats['25'])  # (25)  
	self.conv4_4_2 = copy.deepcopy(feats['26'])  # (26)  
	self.conv4_4 = nn.Sequential(  
		self.conv4_4_1,  
		self.conv4_4_2  
	)  
	```  

	score output结构，输出置信分：  
	```  
	self.conv5_1_det = nn.Conv2d(in_channels=768,  
                                     out_channels=512,  
                                     kernel_size=(1, 1))  
	self.conv5_2_det = nn.Conv2d(in_channels=512,  
									out_channels=1,  
									kernel_size=(1, 1))  
	torch.nn.init.xavier_normal_(self.conv5_1_det.weight.data)  
	torch.nn.init.xavier_normal_(self.conv5_2_det.weight.data)  

	self.output_score = nn.Sequential(  
		self.conv5_1_det,  
		nn.Dropout(),  
		self.conv5_2_det  
	)  

	```  
	loc output结构，输出bbox偏移量：  
	```  
	self.conv5_1_loc = nn.Conv2d(in_channels=768,  
                                     out_channels=512,  
                                     kernel_size=(1, 1))  
	self.conv5_2_loc = nn.Conv2d(in_channels=512,  
									out_channels=4,  
									kernel_size=(1, 1))  
	torch.nn.init.xavier_normal_(self.conv5_1_loc.weight.data)  
	torch.nn.init.xavier_normal_(self.conv5_2_loc.weight.data)  

	self.output_loc = nn.Sequential(  
		self.conv5_1_loc,  
		nn.Dropout(),  
		self.conv5_2_loc  
	)  
	```  
* forward(self, X)  

	forward函数用于前向传播，输入为图像X，依次通过网络各个结构：  
	```  
	X = self.conv1_1(X)  
    X = self.conv1_2(X)  
    X = self.pool1(X)  
	#...(省略中间过程)...  
	conv4_4_X = self.conv4_4(X)  

	# 上采样后与低层特征进行特征融合  
	conv4_4_X_us = nn.Upsample(size=(conv3_4_X.size(2),  
                                         conv3_4_X.size(3)),  
								mode='bilinear',  
								align_corners=True)(conv4_4_X)  
	fusion = torch.cat((conv4_4_X_us, conv3_4_X), dim=1)  

	#返回结果  
	scores = self.output_score(fusion)  
    locs = self.output_loc(fusion)  
	return scores, locs  
	```  

## densebox/DenseBoxDataset.py解析  

DenseBoxDataset.py用于处理读入数据，首先定义自定义数据集`class DenseBoxDataset(Dataset)`，然后主要实现`__init__`函数、`__getitem__`函数和`__len__`函数。  
* \_\_init\_\_(self, root, ann_file = 'train.json', size=(240, 240), test_mode=False)  

	__init__函数用于初始化输入数据（所有图片的annotation），并将其转换到要求的形式读入内存：  
	1. 首先加载数据集所有图片信息（load_annotations函数）；  
	2. 然后从读取的数据中解析出每张图片的annotation信息（get_ann_info函数和_parse_ann_info函数），从annotation中解析出bbox信息和label信息（如果需要，还可以bbox转换到指定的坐标空间），并使用list有序保存。这样每张图片的GT就加载到内存中了；  
	3. 最后设置用于“格式化”图片的transform函数。  
* \_\_getitem\_\_(self, idx)  
	__getitem__函数，在test阶段只返回图片，在train阶段返回图片以及对应GT。目前我只实现了train阶段的部分：  
	1. 从__init__中已经初始化的所有图片信息中获得指定idx的图片名，并读取该图片，然后使用__init__中的“格式化”手段变换图片；  
	2. 从__init__中已经解析好的bbox信息和label信息中，取得指定idx对应的数据。  
	3. 返回图片+GT数据（annotation中解析出的内容）。这里使用的数据集中不含有负样本（没有目标的样本图片）。  
* \_\_len\_\_(self)  
	__len__函数返回数据集的大小（图片数量）：  
	返回__init__中存储所有图片信息的list的长度即可。  
* show(img, bboxes):  
	为了可视化数据加载的是否成功，我编写一个全局函数：  
	```  
	def show(img, bboxes):  
    	"""  
    	img为tensor格式，bbox为list  
    	"""  
		img = np.array(img)  
		img = np.transpose(img,(1,2,0))  
		plt.imshow(img)  
		#画矩形框  
		for bbox in bboxes:  
			xmin = bbox[0]  
			ymin = bbox[1]  
			xmax = bbox[2]  
			ymax = bbox[3]  
			top = ([xmin, xmax], [ymin, ymin])  
			right = ([xmax, xmax], [ymin, ymax])  
			botton = ([xmax, xmin], [ymax, ymax])  
			left = ([xmin, xmin], [ymax, ymin])  
			lines = [top, right, botton, left]  
			for line in lines:  
				plt.plot(*line, color = 'r')  
				plt.scatter(*line, color = 'b')  
		#调整原点到左上角  
		ax = plt.gca()  
		ax.xaxis.set_ticks_position('top')  
		plt.show()  
	```  

## train.py解析  

train.py即模型的训练过程，包含采样策略。常规训练流程：加载数据集 -> 设置train_loader -> 网络初始化 -> 设置损失函数 -> 设置优化策略 -> 调整网络为训练模式 -> 训练循环。以下列举重点进行分析：  
* train_loader：首先根据batchsize的数值决定调用DenseBoxDataset的`__getitem__`函数的次数；然后通过`collate_fn`函数对读取到的batch进一步加工：将读取到的一个batch中的多组数据整合，即增加一个batch维度；最后将batchsize个的batch合并。  
	```  
	def collate_fn_customer(batch):  
	images = []  
	bboxes = []  
	for i, data in enumerate(batch):  
		# data[0]为img维度  
		images.append(data[0])  
		# data[1]为bbox维度  
		bboxes.append(data[1])  
	#对images进行类型转换:list->torch.tensor  
	#注意一张图片中可能有多个bbox，bbox维度不同使用`stack`函数会报错,因此直接返回list形式的bboxes  
	images = torch.stack(images)  
	batch = (images, bboxes)  
	return batch  
	```  
* 定义网络、损失函数、优化策略，网络和数据需要加载到GPU上，之后设置网络为训练模式：  
	```  
	os.environ['CUDA_DEVICE_ORDER'] = 'PCI_BUS_ID'  
	os.environ['CUDA_VISIBLE_DEVICES'] = '1'  
	device = torch.device('cuda: 0' if torch.cuda.is_available() else 'cpu')  

	net = DenseBox(vgg19=vgg19_pretrain).to(device)  
	loss_func = nn.MSELoss(reduce=False).to(device)  
	optimizer = torch.optim.SGD(net.parameters(),  
							lr=base_lr,  
							momentum=9e-1,  
							weight_decay=5e-8)  # 5e-4 or 5e-8  

	net.train()  
	```  
* 网络训练过程：从dataloader中以batchsize为单位读取数据，batch中分成两部分：img和GT，img作为网络输入，GT转换成指定形式后，参与后续损失的计算：  
	1. 读取batch[0]存储的imgs数据并加载到GPU上  
	2. 读取batch[1]存储的bboxes数据：将bboxes数据转换到与输出特征图尺寸对应的score_map、dist_map上，用于损失计算；将bboxes数据转换到mask_map上，用于应用采样策略。然后将它们加载到GPU上。  
	3. 清空梯度->前向传播->计算分类和定位损失  
	4. 采样策略（以batch_size为单位进行采样，而不是一张图为单位）：  
		```  
		# 统计正样本数量  
		pos_indices = torch.nonzero(cls_maps_gt)  
		positive_num = pos_indices.size(0)  
		# 负样本与正样本相等:img.size(0)即batch_size,若这里使用batch_size会在最后不足一个完整batch时报错  
		neg_num = int(float(positive_num) / float(img.size(0)) + 0.5)  
		# 获得负样本的mask掩码，用于采负样本  
		ones_mask = torch.ones([img.size(0), 1, 60, 60],  
								dtype=torch.float32).to(device)  
		neg_mask = ones_mask - cls_maps_gt  
		neg_cls_loss = cls_loss * neg_mask  
		# 一半从困难负样本获得,一半随机采样  
		half_neg_num = int(neg_num * 0.5 + 0.5)  
		neg_cls_loss = neg_cls_loss.view(img.size(0), -1)  
		hard_negs, hard_neg_indices = torch.topk(input=neg_cls_loss,  
													k=half_neg_num,  
													dim=1)  
		# 随机采样可改进为从负样本中采样,目前是从全体样本中随机采样  
		rand_neg_indices = torch.zeros([img.size(0), half_neg_num], dtype=torch.long).to(device)  
		for i in range(img.size(0)):  
			indices = np.random.choice(3600, #60*60  
										half_neg_num,  
										replace=False)  
			indices = torch.Tensor(indices)  
			rand_neg_indices[i] = indices  
		#汇总负样本indices  
		neg_indices = torch.cat((hard_neg_indices,  
									rand_neg_indices),  
								dim=1)  
		neg_indices = neg_indices.cpu()  
		pos_indices = pos_indices.cpu()  
		```  
		这样正负样本点就确定了。  
	5. 将上述一维空间的样本idx转换到(batchsize, 1, w, h)坐标空间中，更新mask_map；然后通过grayzone去除掉bbox边缘的一部分正样本，更新mask_map;最终确定全部采样点。  
	6. 最后将mask_map与损失map相点乘，即可得到最终的损失：  
		```  
		mask_cls_loss = mask_maps * cls_loss    #分类损失  
		mask_bbox_loc_loss = mask_maps * cls_maps_gt * bbox_loc_loss    #定位损失  
		full_loss = lambda_cls * (torch.sum(mask_cls_loss)  
					+ lambda_loc * torch.sum(mask_bbox_loc_loss))  
		```  
	7. 反向传播和更新参数：  
		```  
		full_loss.backward()  
		optimizer.step()  
		```  
	8. log信息的输出与保存、log信息的输出与保存、checkpoint的保存（不同频率）。另外学习率可以随着epoch的增加作相应调整：  
		```  
		def adjust_LR(optimizer, epoch):  
			lr = 1e-9  
			if epoch < 5:  
				lr = 1e-9  
			elif epoch >= 5 and epoch < 10:  
				lr = 2e-9  
			elif epoch >= 10 and epoch < 15:  
				lr = 4e-9  
			else:  
				lr = 1e-9  
			for param_group in optimizer.param_groups:  
				param_group['lr'] = lr	#更新lr  

			return lr  
		```  

## test.py解析  

test.py即模型测试过程：  
初始化网络并加载到GPU->网络切换到测试模式->读取测试图片并做相应变换->数据输入网络得到输出->解析输出并可视化（目前未实现统计评估的功能）。以下列举重点并分析：  
* 初始化网络：首先加载vgg19预训练模型，然后使用vgg19初始化DenseBox网络，最后将保存的检查点加载到DenseBox网络。  
	```  
	vgg19_pretrain = torchvision.models.vgg19()  
	vgg19_pretrain.load_state_dict(torch.load('vgg19.pth'))  
	net = DenseBox(vgg19=vgg19_pretrain).to(device)  
	net.load_state_dict(torch.load(resume))  
	print('=> 网络从 {} 加载'.format(resume))  
	```  
* 使用visdom观察预测结果置信度热图：  
	```  
	import visdom  
	vis = visdom.Visdom()  
	vis.heatmap(score_out[0,0])  
	```  
* 解析输出后使用非极大抑制算法，最后训练阶段编写的`show`函数可视化结果：  
	```  
	#保留置信度前K的结果，并且解析成bbox形式返回  
	dets = parse_out_MN(score_map=score_out.cpu(),  
								loc_map=loc_out.cpu(),  
								M=H,  
								N=W,  
								K=10)  
	# 非极大抑制  
	keep = NMS(dets=dets, nms_thresh=0.4)  
	dets = dets[keep]  
	# 可视化结果(GT+DT)  
	show(img_tensor, [[60,101,181,143]])  
	show(img_tensor, dets)  
	```  

# 总结  

这次复现的本质是从头到尾细致地读了一遍代码。收获最大的地方是对数据采样这个方面，有了细致的了解。  
网络和代码目前可以改进的地方很多：  
1. 不支持多尺度，可以结合FPN做改进  
2. 数据加载耗时长，可以考虑多个batch_size的数据批量加载到内存  
3. 测试时的dataloader未完成  
4. evaluate功能未实现  
5. 细节处可以改进  
DenseBox代码复现告一段落，之后有时间可能会优化代码。接下来更多着重在mmdetection toolbox上，它的整个框架结构更加成熟，并且也更加高效，值得深入研究。  