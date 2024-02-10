
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

    displayOptions(["李泽是一个什么样的人？"], ["chooseOption1"]);


}

async function chooseOption1() {
    await displayUserMessage("李泽是一个什么样的人？");
    await displayOtherMessage("不高，挺年轻的");


    await displayOptions(["帅吗？",  "他是靠什么赚钱的？"], ["chooseOption2", "chooseOption3"]);
}


async function chooseOption2() {
    await displayUserMessage("帅吗？");
    await displayOtherMessage("我不知道。这很重要吗？");

    await displayOptions(["很重要啊！帅哥犯罪更可怕！！"], ["chooseOption4"]);
}


async function chooseOption4() {
    await displayUserMessage("很重要啊！帅哥犯罪更可怕！！");
    await displayOtherMessage("……");
    await displayOtherMessage("好吧，你说的可能也有道理。但是我真的没留意，抱歉");

    await displayOptions(["我也就是随口一问……对了，李泽是做什么工作，感觉还挺有钱的，能一口气买下这个瓶子"], ["chooseOption5"]);
}


async function chooseOption5() {
    await displayUserMessage("我也就是随口一问……对了，李泽是做什么工作，感觉还挺有钱的，能一口气买下这个瓶子");
    await displayOtherMessage("老秦给我的资料上提到，李泽早期就是个卖义乌小商品的网店卖家，后来突然开始倒腾古董");
    await displayOtherMessage("要承认的一点是，他确实运气不错");}

async function chooseOption3() {
        await displayUserMessage("他是靠什么赚钱的？");
        await displayOtherMessage("老秦给我的资料上提到，李泽早期就是个卖义乌小商品的网店卖家，后来突然开始倒腾古董");
        await displayOtherMessage("要承认的一点是，他确实运气不错");
    
        // 显示玩家的选项6
        await displayOptions(["只是运气不错而已吗……"], ["chooseOption6"]);
    }
    
    // 玩家选项6的回调函数
    async function chooseOption6() {
        await displayUserMessage("只是运气不错而已吗……");
        await displayOtherMessage("你是想说……");
    
        // 显示玩家的选项7
        await displayOptions(["会不会有什么隐情？"], ["chooseOption7"]);
    }
    
    // 玩家选项7的回调函数
    async function chooseOption7() {
        await displayUserMessage("会不会有什么隐情？");
        await displayOtherMessage("很快就知道了");
    
        // 跳转到结束对话
        endConversation();
    }

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