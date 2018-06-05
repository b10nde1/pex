let btnConfirm=document.getElementById("btn-confirm");

btnConfirm.onclick=(activeTab)=>{
    let baseUrl=document.getElementById('base-url').value;
    let category=document.getElementById('category').value;
    let listSubCategory=(document.getElementById('list-sub-category').value).split(" ");
    let article=document.getElementById('article').value;
    let listDisplayName=(document.getElementById('list-display-name').value).split(" ");
    displayResult(concat(baseUrl,category,listSubCategory,article,listDisplayName));
    copyElement(document.getElementById('result'));
}

const displayResult=(arg)=>{
    let result='';
    for(var compt=0;compt<arg.length;compt++){
        result+='<p>'+arg[compt]+'</p>';
    }
    document.getElementById('result').innerHTML=result;
}

const concat=(baseUrl,category,listSubCategory,article,listDisplayName)=>{
    if(baseUrl=='' || category=='' || listSubCategory=='' || article=='' || listDisplayName=='') console.log('[concat]::Error data')
    try{
        let result=new Array(listDisplayName.length);
        for(var compt=0;compt<listDisplayName.length;compt++){
            result[compt]=baseUrl+'/'+category+'/'+listSubCategory[compt]+'/'+article+'/'+listDisplayName[compt];
            if(document.getElementById('optionOpenUrls').checked)open(result);
        }
        return result;
    }
    catch(e){
        console.log('[const]::Error exception ::'+e);
    }
}

const prepareUrls=()=>{
    
}

const xhrStatus=(arg)=>{
    try{
        var xhr = new XMLHttpRequest();
        xhr.open('GET', arg, true);
        xhr.onprogress = function () {
            console.log('LOADING', xhr.status);
        };
        xhr.onload = function () {
            console.log('DONE', xhr.status);
        };
        return xhr.status;
        xhr.send(null);
    }
    catch(e){
        console.log('[xhrStatus]::Error exception ::'+e);
    }
}

const openPage=(urlIn)=>{chrome.tabs.create({ url: urlIn , selected: false});}

const copyElement=(el)=>{
    let body = document.body, range, sel;
    if (document.createRange && window.getSelection) {
        range = document.createRange();
        sel = window.getSelection();
        sel.removeAllRanges();
        try {
            range.selectNodeContents(el);
            sel.addRange(range);
        } catch (e) {
            range.selectNode(el);
            sel.addRange(range);
            console.log('[copyElement]::Error exception ::'+e);
        }
    } else if (body.createTextRange) {
        range = body.createTextRange();
        range.moveToElementText(el);
        range.select();
    }
    document.execCommand("Copy");
}
