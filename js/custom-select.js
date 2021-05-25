const filtros = data => {

var x, i, j, l, ll, selElmnt, a, b, c;
/* Procure qualquer elemento com a classe "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;

for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* ou cada elemento, crie um novo DIV que atuará como o item selecionado:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* Para cada elemento, crie um novo DIV que conterá a lista de opções: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");

  for (j = 1; j < ll; j++) {
    /* Para cada opção no elemento de seleção original,
    crie um novo DIV que funcionará como um item de opção:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /*Quando um item é clicado, atualize a caixa de seleção original,
        e o item selecionado: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
      h = this.parentNode.previousSibling;
      
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            
            console.log(s.options[i].value)
            const query = s.options[i].value
            if (query === '') {
              banderillas(data)
            } else {
              const arrayFiltrado = data.filter(item => item.region === query)
              banderillas(arrayFiltrado)
            }
            
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /*Quando a caixa de seleção é clicada, feche todas as outras caixas de seleção,
    e abrir / fechar a caixa de seleção atual: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* Uma função que fechará todas as caixas de seleção no documento,
  exceto a caixa de seleção atual: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

  /* Se o usuário clicar em qualquer lugar fora da caixa de seleção,
  em seguida, feche todas as caixas de seleção: */
  document.addEventListener("click", closeAllSelect);


}