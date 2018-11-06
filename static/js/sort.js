function sortElements() {
  var sortable = document.querySelectorAll('.js-sort');
  [].forEach.call(sortable, function(container) {
    var criteria = container.getAttribute('data-sort');
    var elements = [].slice.call(container.querySelectorAll('[' + criteria + ']'));
    var direction = container.getAttribute('data-sort-direction') || "asc";
    elements.sort(function(a,b) {
      return a.getAttribute(criteria) < b.getAttribute(criteria);
    });

    if(direction == "desc") { 
      elements.reverse();
    }

    elements.forEach(function(item, idx)
    {
      if(idx>0)
      item.parentNode.insertBefore(item, elements[idx-1]);
    });

  });
}

if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
  sortElements();
} else {
  document.addEventListener('DOMContentLoaded', sortElements);
}