# [SisJur](http://sistemas.badmapcmo.eb.mil.br/SisJur/) - Script Tampermonkey para coleta e preenchimento de dados do Sistema SisJur

[![GitHub license](https://img.shields.io/apm/l/vim-mode.svg)](LICENSE)

## Credits

### Author
[Marcelo Valvassori Bittencourt (bitts)](https://github.com/bitts)

# About
Tapermonkey user script. Script Tampermonkey para coleta e preenchimento de dados do Sistema http://sistemas.badmapcmo.eb.mil.br/SisJur/ para confecção de Sindicâncias dentro do Ambito do Exercito Brasileiro. Sistema acessível somente via EBNet. 

O sistema consiste em incremento da ferramenta disponibilizada pelo na intranet da BASE DE ADMINISTRAÇÃO E APOIO DO COMANDO MILITAR DO OESTE em seu sistema "SISJUR | SISTEMAS JURÍDICOS", ferramenta esta que facilita a confecção de Sindicancias, IPM por exemplo, onde é apresentados formulários com todos os campos necessários para geração de documentos no padrão definido em legislação própria; Documentos são gerados no formato PDF; Acessivel através da EBNet no endereço http://sistemas.badmapcmo.eb.mil.br/SisJur/.

Estas melhorias basicamente incluem uma caixa no topo dos formulários com a descrição "Dados dos Formulários", onde um textarea é apresentado e mais quatro botões,  "Gerar", "Copiar", "Preencher" e "Download"; onde:
- Botão "Gerar": coleta os dados preenchidos nos formulários e monta um JSON com os dados;
- Botão "Copiar": copia o conteudo da textarea com os dados dos formulários para a área de transferência;
- Botão "Preencher": pega dados do JSON apresetados na textarea e preenche os formulários com os dados;
- Botão "Download": gera um arquivos txt com o conteudo JSON da textarea.



# Uso
https://www.tampermonkey.net/?ext=dhdg

