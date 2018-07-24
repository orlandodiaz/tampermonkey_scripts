// ==UserScript==
// @name         Sort by Ratings
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.goodreads.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    class BookBlock {

        constructor(elem) {
            let el;
            let rating;
            let rating_literal;
            this.el = elem;
            console.log(el);

            this.rating_literal = this.el.querySelectorAll('.left > span.greyText.smallText')[0].innerText
            this.rating = this.rating_literal.match(/[\s][0-9,]{1,6}[\s]/g)[0].trim().replace(",","");

        };
    };

    // get element list
    let elems = document.querySelectorAll('.elementList[style="padding-top: 10px;"]');

    // create list that holds objects
    let book_list = [];

    // Create an instance for each book block
    for (let i = 0; i < elems.length-1;i++) {
        let book;
        //let elem;
        let elem = elems[i];
        book = new BookBlock(elem);
        book_list.push(book);

    }
    // inplace high to low sorting!
    book_list.sort(function(a,b){return b.rating-a.rating});

    // print sorted book list to screen
    //console.log(book_list);

    for (var i=0;i< elems.length-i;i++) {
        console.log(`Replacing ${i}`);
        document.querySelectorAll('.elementList[style="padding-top: 10px;"]')[i].replaceWith(book_list[i].el)
    }


    // Your code here...
})();