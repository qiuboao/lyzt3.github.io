
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

    displayOptions(["王晓雨看起来和李泽关系很好啊","李泽和王晓雨是情侣吗？"], ["chooseOption1","chooseOption2"]);


}

async function chooseOption1() {
    await displayUserMessage("王晓雨看起来和李泽关系很好啊");
    await displayOtherMessage("不像情侣，像好朋友");


    await displayOptions(["咦？你看得出情侣吗？"], [ "chooseOption3"]);
}

async function chooseOption2() {
    await displayUserMessage("李泽和王晓雨是情侣吗？");
    await displayOtherMessage("不像情侣，像好朋友");


    await displayOptions(["咦？你看得出情侣吗？"], [ "chooseOption3"]);
}


async function chooseOption3() {
    await displayUserMessage("咦？你看得出情侣吗？");
    await displayOtherMessage("嗯");

    await displayOptions(["好你个小绿领！！！"], ["chooseOption4"]);
}


async function chooseOption4() {
    await displayUserMessage("好你个小绿领！！！");
    await displayOtherMessage("搞不懂你……");
    await displayOptions(["那她漂亮吗？","你觉得王晓雨是个什么样的人？"], ["chooseOption5","chooseOption6"]);
}


async function chooseOption5() {
    await displayUserMessage("那她漂亮吗？");
    await displayOtherMessage("你今天怎么净问不相干的问题？");
    await displayOtherMessage("我没注意看");

    await displayOptions(["你！！哈哈哈哈你还记得！！"], ["chooseOption7"]);
}

async function chooseOption7() {
    await displayUserMessage("你！！哈哈哈哈你还记得！！");
    await displayOtherMessage("性格上单纯直率，没有生活压力的感觉");
    await displayOptions(["感觉是被很多爱包围着长大呢……"], ["chooseOption8"]);
}

async function chooseOption6() {
        await displayUserMessage("你觉得王晓雨是个什么样的人?");
        await displayOtherMessage("性格单纯直率的富家女");

        await displayOptions(["感觉是被很多爱包围着长大呢……"], ["chooseOption8"]);
    }
    
    // 玩家选项6的回调函数
    async function chooseOption8() {
        await displayUserMessage("感觉是被很多爱包围着长大呢……");
        await displayOtherMessage("或许吧");
    
        // 显示玩家的选项7
        await displayOptions(["你会羡慕吗？"], ["chooseOption9"]);
    }
    
    // 玩家选项7的回调函数
    async function chooseOption9() {
        await displayUserMessage("你会羡慕吗？");
        await displayOtherMessage("小时候会，现在不会了");

        await displayOptions(["N……","没关系！！你现在有我陪你！"], ["chooseOption10","chooseOption11"]);

        async function chooseOption10() {
            await displayUserMessage("N……");}
    
        // 跳转到结束对话
        endConversation();
    }

    async function chooseOption11() {
        await displayUserMessage("没关系！！你现在有我陪你！");

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