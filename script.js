// ==UserScript==
// @name         Sindicância no SisJur - BAdmApCMO
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Salvando dados do formulario de geração de documentos - Sindicâncias
// @author       Marcelo Valvassori Bittencourt - 2º Ten Bittencourt
// @match        http://sistemas.badmapcmo.eb.mil.br/SisJur/sisSindInv/*
// @grant        none
// @require      http://sistemas.badmapcmo.eb.mil.br/SisJur/sisSindInv/assets/js/bootstrapValidator.js
// ==/UserScript==

(function($) {
    'use strict';

    $.fn.serializeObject = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            let nm = this.name.replace('\[\]','');
            let vl = this.value;
            if (o[nm] && vl !== "" && $.inArray([o[nm]], o[nm]) === -1) {
                if (!o[nm].push) {
                    o[nm] = [o[nm]];
                }
                if($.inArray(vl, o[nm]) === -1)o[nm].push(vl || '');
            } else if(vl !== "" && $.inArray(vl, o[nm]) === -1){
                o[nm.replace('\[\]','')] = vl || '';
            }
        });
        return o;
    };
  
    $.fn.populateForm = function (values) {
        if (values === '')return;
        var $form = this;
        var data = values;
        if ($.type(values) === 'string') {
            data = JSON.parse(values);
        }
        $.each(data, function (name, val) {
            var $el = $form.find("[name='" + name + "']");
            var isSelect = $el.is('select');
            var isTextarea = $el.is('textarea');
            if ($.isArray(val)){
                var selector = "[name='" + name + "\\[\\]']";
                $el = $form.find(selector);
            }
            var type = (isSelect) ? 'select' : ((isTextarea)?'textarea':$el.attr('type'));
            switch (type) {
                case 'textarea':
                    var ida = $el.attr('id');
                    var txta = (CKEDITOR)?CKEDITOR.instances[ida]:$el
                    if( txta && txta.name && txta.status === "ready" )txta.setData(val);
                    $el.val(val);
                    break;
                case 'checkbox':
                    if ($.isArray(val)) {
                        $el.each(function () {
                            var state = $.inArray($(this).val(), val);
                            $(this).prop('checked', state);
                        });
                    } else {
                        $el.prop('checked', true);
                    }
                    break;
                case 'radio':
                    $el.filter('[value="' + val + '"]').prop('checked', true);
                    break;
                case 'select':
                    if ($.isArray(val)){
                        $el.children('option').each(function(){
                            var state = $.inArray($(this).val(), val);
                            $(this).prop('selected', state);
                        });
                    } else{
                        $el.val(val);
                    }
                    break;
                default:
                    if (val && $.isArray(val)){
                        let fm = $el.closest('form');
                        let id = fm.attr('id');
                        let nb = id.substring(id.length, id.length - 1);

                        let i = 0;
                        $.map(val, function(vl){
                            if(i == 0){
                                fm.find('[name="Termo'+ nb +'option[]"]').val(vl);
                            }else{
                                let $template = $('#optionTemplate'+ nb);
                                let $clone = $template.clone().removeClass('hide').removeAttr('id').insertBefore($template);
                                let $option = $clone.find('[name="Termo'+ nb +'option[]"]').val(vl);

                                $('#'+ id).bootstrapValidator('addField', $option);
                            }
                            i++;
                        });
                    } else{
                        $el.val(val);
                    }
                    break;
            }
        });
        return this;
    };



    $(document).ready(function() {

        function msg(txt) {
            $('.feedback').txt(txt).animate({
                height: 'toggle'
            });
        }

        var box = $('<div />')
        .addClass('well well-sm text-center incremento')
        .append(
            $('<h2 />').text('Dados dos Formulários'),
            $('<textarea />').css({'margin': '10px','width': '90%', 'min-height': '200px'}),
            $('<br />'),
            $('<button />')
            .addClass("btn btn-default")
            .append( $('<span />').addClass("fa fa-save"), ' Gerar' )
            .on('click', function(e){
                e.preventDefault();
                var formData = $('form').serializeObject();
                var txt = JSON.stringify(formData, undefined, 4);
                $('.incremento > textarea').val(txt);
                msg('Dados gerados');
                return false;
            }),
            ' ',
            $('<button />')
            .addClass("btn btn-default")
            .append( $('<span />').addClass("fa fa-clipboard"), ' Copiar' )
            .on('click', function(e){
                e.preventDefault();
                $('.incremento > textarea').select();
                var copiar = document.execCommand('copy');
                if(copiar)msg('Copiado');
                else msg('Não foi possível copiar conteudo da textarea.');
                return false;
            }),
            ' ',
            $('<button />')
            .addClass("btn btn-default")
            .append( $('<span />').addClass("fa fa-check-square-o"), ' Preencher' )
            .on('click', function(e){
                e.preventDefault();
                let values = JSON.parse($('.incremento > textarea').val());
                $("form").populateForm(values);
                msg('Dados preenchidos no formulário.');
            }),
            ' ',
            $('<button />')
            .addClass("btn btn-default")
            .append( $('<span />').addClass("fa fa-floppy-o"), ' Download' )
            .on('click', function(e){
                e.preventDefault();

                let text = $('.incremento > textarea').val();
                let data = new Blob([text], {type: 'text/plain'});
                let url = window.URL.createObjectURL(data);
                var fileName = 'backup_sindicancia.txt';

                let a = document.createElement('a');
                a.setAttribute('download', fileName);
                a.setAttribute('href', url);
                a.click();
                
                msg('Gerando arquivo para Download.');
            }),
            ' ',
            $('<div />').addClass('feedback')
        );
        $('body > div.container').prepend(box);
    });

})(jQuery);
