const authorize = ({
  default_avatar_id: defaultAvatarId,
  display_name: displayName,
}) => {
  const avatarHtml = <div class="avatar" style="background-image:url(’https://avatars.mds.yandex.net/get-yapic/${defaultAvatarId}/islands-middle’)"></div>;
  const nameHtml = <div class="name">${displayName}</div>;
  
  document.getElementById("auth").innerHTML = ${avatarHtml}${nameHtml};
};

const fetchYandexData = (token) =>
  fetch(https://login.yandex.ru/info?format=json&auth_token=${token}).then(
    (res) => res.json()
);

document.getElementById("button").onclick = () => {
   window.YaAuthSuggest.init(
     {
       client_id: "735de623ee1842b28e97fdbd184823a5",
       response_type: "token",
       redirect_uri: "https://oauth-master-class-self.vercel.app/token.html",
     },
     "https://oauth-master-class-self.vercel.app",
     {
       parentId: "buttonContainer",
       view: "button",
       buttonTheme: "light",
       buttonSize: "xs",
       buttonBorderRadius: 20,
   }
 )
     .then(({ handler }) => handler())
     .then(async (data) => {
       console.log("Сообщение с токеном(от кнопки): ", data);
       
       const result = await fetchYandexData(data.access_token);
       
       console.log("Сообщение с ответом Яндекса(от кнопки): ", result);
       authorize(result);
     })
     .catch((error) => console.log("Что-то пошло не так: ", error));
 };
