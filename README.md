# Journal

## 2022

### 3.3

#### 使用脚本向手机发送通知

本来`IFTTT`应该会很好用，但是墙太高了经常收不到消息。

#### Python 语音识别

`SpeechRecognition`这个库蛮方便，其中`Google`的api不需要注册申请，效果也好。

#### 录制系统内声音

需要借助名为”立体声混响“的虚拟声卡，系统的输出声音会在这个声卡上`loopback`成输入。

如果原本没有，`Windows`上可以在设置中开启，`Linux`上可以用`pacmd load-module module-loopback`开启。

[ref](https://stackoverflow.com/a/56612274)

### 3.1

这么久都没更新，漏掉了好多经验。。。

#### Qt应用无法输入中文：

```shell
yay -S fcitx-qt5
```

安装后，Linux版腾讯会议的问题成功解决。此方法可解决大量**基于`qt`开发**的程序的中文输入问题。

## 2021

### 12.2

安装`miniconda`之后，`python`交互界面出现退格和方向键失灵现象，是因为`terminfo`配置不正确。

```shell
export TERMINFO=/usr/share/terminfo
```

添加到`~/.zshrc`即可解决

（还有一些说法是复制`/usr/share/terminfo/r/rxvt-unicode-256color`至环境目录下对应位置，显然上边的方法更贴近本质）

### 10.7

关于`adb`截图缓慢问题，见博客[加快adb截图](https://www.cnblogs.com/terrasse/p/fast-adb.html)


### 9.27

OpenCV默认使用BGR

### 9.2

#### Python bytes & str

```python
x = 'asdf'.encode() # x==b'asdf'
y = b'asdf'.decode() # y=='asdf'
```

### 9.1

#### OpenCV

[含透明通道的模板匹配](https://www.orcode.com/question/1188579_k933b1.html)

#### PyMouse

```
    from unix import PyMouse, PyMouseEvent
ModuleNotFoundError: No module named 'unix'
```

`pip install PyUserInput`即可解决

### 8.28

#### Github SSH Key

https://blog.csdn.net/u013778905/article/details/83501204

#### cf-tool

https://github.com/xalanq/cf-tool

#### TRSWNCA's Journal

https://github.com/TRSWNCA/journal

