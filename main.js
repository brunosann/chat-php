const conn = new WebSocket("ws://localhost:8080");
conn.onopen = function (e) {
  console.log("Connection established!");
};

conn.onmessage = function (e) {
  showMessages("other", e.data);
};

const S = (el) => document.querySelector(el);
const message = S("#message");
const chat = S("#chat");
const user = S("#name");
const btn = S("#btn");

const handleSendMessage = () => {
  if (!user.value) return alert("Preencha seu nome!");
  if (!message.value) return alert("Digite uma mensagem!");
  const objMsg = {
    name: user.value,
    msg: message.value,
  };
  const stringMsg = JSON.stringify(objMsg);
  conn.send(stringMsg);
  message.value = "";
  showMessages("me", stringMsg);
};

const showMessages = (user, msg) => {
  const jsonMsg = JSON.parse(msg);
  const msgRight = `
    <div
    class="w-max ml-auto break-all mt-2 mb-1 p-2 rounded-br-none bg-blue-500 rounded-2xl text-white text-left mr-5"
    >
      <p class=" text-sm">você disse:</p>
      ${jsonMsg.msg}
    </div>
  `;

  const msgLeft = `
    <div
    class="other break-all mt-2 ml-5 rounded-bl-none float-none bg-gray-300 mr-auto rounded-2xl p-2"
    >
      <p class="text-sm font-semibold">${jsonMsg.name}:</p>
      ${jsonMsg.msg}
    </div>
  `;
  chat.innerHTML += user == "me" ? msgRight : msgLeft;
  chat.scrollTop = chat.scrollHeight;
};

btn.addEventListener("click", handleSendMessage);
