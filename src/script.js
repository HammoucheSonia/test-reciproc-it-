import React from "react";
import $, { ready, click } from 'jquery';

/*selectionner les profils en fontions de la nationalite choisie*/

$(document).ready(function () {

    var url = "https://randomuser.me/api/?results=4";
    var p = "";
    var selectedNationality;
    var loadMore;

    fetchInformation(url);

    $("input[type='radio']").click(function () {
        selectedNationality = $('#nationality :selected').text();
        $("#result").empty();
        //ajouter la nationalite//
        //plus info : documentation api//
        url = "https://randomuser.me/api/?results=4&gender=" +"&nat=" + selectedNationality;
    });

    $('#nationality').on('change', function () {
        var p = "";
        $("#result").empty();
        selectedNationality = $('#nationality :selected').text();
        url = "https://randomuser.me/api/?results=4&gender=" + "&nat=" + selectedNationality;
        fetchInformation(url);
    });

    function fetchInformation(url) {
        fetch(url)
            .then((response) => response.json())
            .then(function (data) {

                data.results.forEach(person => {
                    //affichage//

                    p = `<div class="well">
                        <img src="${person.picture.medium}" class="img-rounded" alt="image">
                        <span style="margin-left:25px;">${person.name.title}  ${person.name.first} ${person.name.last}</span>
                        <span>(${person.nat})</span>
                        <span style="margin-left:375px;">
                        <div>${person.email}</div></span>
                    </div>`;
                    $("#result").append(p);

                });
                //chercher plus de profils avec la meme selection//
                loadMore = '<button id="loadmore" class="btn btn-primary">Load More</button>';

                $("#result").append(loadMore);

                $('#loadmore').on('click', function () {
                    fetchInformation(url);
                    $(this).remove();
                });


            })
    }

});
 export default ready; 