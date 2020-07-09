# [SisJur](http://sistemas.badmapcmo.eb.mil.br/SisJur/) - Script Tampermonkey para coleta e preenchimento de dados do Sistema SisJur

[![GitHub license](https://img.shields.io/apm/l/vim-mode.svg)](LICENSE)

## Credits

### Author
[Marcelo Valvassori Bittencourt (bitts)](https://github.com/bitts)

# About
Script Tampermonkey para coleta e preenchimento de dados do Sistema http://sistemas.badmapcmo.eb.mil.br/SisJur/ para confecção de Sindicâncias dentro do Ambito do Exercito Brasileiro. Sistema acessível somente via EBNet.

O sistema consiste em incremento da ferramenta disponibilizada pelo Comando Militar do Oeste em seu sistema "SISJUR | SISTEMAS JURÍDICOS", acessivel através da EBNet no endereço http://sistemas.badmapcmo.eb.mil.br/SisJur/.

Estas melhorias basicamente incluem uma caixa no topo dos formulários com a descrição "Dados dos Formulários", onde um textarea é apresentado e mais quatro botões,  "Gerar", "Copiar", "Preencher" e "Download"; onde:
- Botão "Gerar": coleto os dados preenchidos nos formulários e monta um JSON com os dados coletados;
- Botão "Copiar": copia o conteudo da textarea para a área de transferência;
- Botão "Preencher": pega dados do JSON e preenche formulários com os dados;
- Botão "Download": gera um arquivos txt com o conteudo JSON da textarea.



