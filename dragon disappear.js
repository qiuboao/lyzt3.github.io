
const chatBox = document.getElementById('chat-box');

function displayUserMessage(message) {
    return new Promise(resolve => {
        const messageElement = document.createElement('div');
        messageElement.className = 'user-message';
        messageElement.textContent = message;
        chatBox.appendChild(messageElement);
        scrollToBottom(); // 新消息后自动滚动到底部
        setBubbleWidth(messageElement); // 设置对话气泡的宽度
        messageElement.style.position = "relative";
        let width = Number.parseInt(messageElement.style.width.replace("px",""));
        width = width > 258 ? 238 :width;
        messageElement.style.right = 'calc( -100% + '+(width+20)+'px)';
        setTimeout(resolve, 1000); // 延迟一秒后解析Promise
    });
}

function displayOtherMessage(message) {
    return new Promise(resolve => {
        const messageElement = document.createElement('div');
        messageElement.className = 'other-message';
        messageElement.textContent = message;
        chatBox.appendChild(messageElement);
        scrollToBottom(); // 新消息后自动滚动到底部
        setBubbleWidth(messageElement); // 设置对话气泡的宽度
        setTimeout(resolve, 1000); // 延迟一秒后解析Promise
    });
}


// 设置对话气泡的宽度
function setBubbleWidth(element) {
    const charactersPerLine = 45; // 每行字符数，可以根据实际情况调整
    const messageLength = element.textContent.length;
    const numberOfLines = Math.ceil(messageLength / charactersPerLine);
    const maxWidth = 450; // 对话气泡的最大宽度，可以根据实际情况调整

    // 根据消息长度调整对话气泡的宽度
    const calculatedWidth = Math.min(messageLength * 16, maxWidth); // 15 是一个经验值，可以根据实际情况调整

    element.style.width = `${calculatedWidth}px`
}

// 对话函数
async function conversation() {

    displayOptions(["龙消失了！！！怎么回事？？"], ["chooseOption1"]);
}

async function chooseOption1() {
    await displayUserMessage("龙消失了！！！怎么回事？？");
    await displayOtherMessage("我也很震撼，亲眼看见诡异的事情发生还是很不一样。");


    await displayOptions(["不会是类似3D 投影的操作吧……你前面提到，博物馆还为花瓶多加了几盏射灯"], [ "chooseOption2"]);
}

async function chooseOption2() {
    await displayUserMessage("不会是类似3D 投影的操作吧……你前面提到，博物馆还为花瓶多加了几盏射灯");
    await displayOtherMessage("我不觉得是这种技术，因为就我肉眼所见，那条龙非常真实，我还能听见它飞出展厅时摩擦空气的声音");
    await displayOtherMessage("像子弹那样");

    await displayOptions(["我持怀疑态度","天啊好神奇","难道真的有超自然？"], ["chooseOption3","chooseOption4","chooseOption5"]);}

    async function chooseOption3() {
        await displayUserMessage("我持怀疑态度");

     // 跳转到结束对话
     endConversation();}

 async function chooseOption4() {
        await displayUserMessage("天啊好神奇");

     // 跳转到结束对话
     endConversation();}

     async function chooseOption5() {
        await displayUserMessage("难道真的有超自然？");

     // 跳转到结束对话
     endConversation();}

// 结束对话的函数
function endConversation() {
    // 在此添加你的结束对话逻辑
      // 创建按钮元素
      const button = document.createElement('button');
      button.textContent = '返回【线索】';
      // 添加自定义样式
    button.style.backgroundColor = '#000'; // 黑色背景
    button.style.color = '#fff'; // 白色字体
    button.style.padding = '10px 20px'; // 添加一些内边距
    button.style.border = 'none'; // 去掉边框
    button.style.borderRadius = '5px'; // 添加圆角
      // 添加点击事件监听器
      button.addEventListener('click', function() {
          // 在点击按钮时跳转到另一个页面
          window.location.href = 'clue.html';
      });
      // 将按钮添加到聊天框中
      chatBox.appendChild(button);

    // 隐藏选项按钮
    hideOptions();
}

// 隐藏选项按钮的函数
function hideOptions() {
    const userInput = document.getElementById('user-input');
    userInput.innerHTML = ''; // 清空之前的选项
}


// 显示玩家的选项
function displayOptions(options, callbacks) {
    return new Promise(resolve => {
        const userInput = document.getElementById('user-input');
        userInput.innerHTML = ''; // 清空之前的选项

        if (options.length > 0) {
            options.forEach((option, index) => {
                const button = document.createElement('button');
                button.textContent = option;
                button.onclick = async function() {
                    userInput.innerHTML = ''; // 清空选项按钮
                    await window[callbacks[index]](); // 执行选项的回调函数
                    resolve(); // 解析Promise
                };
                userInput.appendChild(button);
            });
        }
    });
}

// 自动滚动到底部的函数
function scrollToBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
}


// 初始化
conversation();