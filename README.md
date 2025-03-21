
# SAEskip

Um UserScript para a VideoAula do ava.sae.digital ficar 100% Automaticamente

Ele funciona interceptando um post pro api do ava falando que o vídeo está em tal porcentagem e modificando pra a porcentagem ficar 100%.



## Instalação

1: Instale uma extensão para gerenciar UserScripts (recomendo o TamperMonkey).
2: Instale o UserScript deste link: https://raw.githubusercontent.com/teogabrielofc/saeskip/refs/heads/main/saeskip.js
3: Acesse a videoaula, assista apenas 1%, aguarde 5 segundos, recarregue a página e pronto! O progresso estará em 100%.

    
## FAQ

#### Como funciona?

Ele funciona interceptando um post para apis.sae.digital/ava/answer/video e modificando o request mudando a porcentagem para 100

#### Você fez o UserScript?

Mais ou menos. Eu achei o método usando o fiddler quando não tinha nada pra fazer, aí quando descobri, pedi pro chatgpt pra fazer um UserScript e virou esse. 

