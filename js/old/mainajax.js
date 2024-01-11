import $ from "https://cdn.skypack.dev/jquery";

let url = 'https://rickandmortyapi.com/api/character'

const listCharacters = () => {
  return new  Promise((resolve, reject) => {
    $.ajax(
      url
    ).done(function(data) {
      url = data.info.next;
      setTimeout(() => {
        resolve(data.results)
      }, 2000)
    })
    .fail(function(err) {
      reject(err)
    }); 
  })
}

$(() => {
  $('button').click(async(event) => {
    event.preventDefault();
    var $this = $(this);
    try {
      $this.attr('disabled', 'disabled');
      const characters = await listCharacters();
      characters.forEach(element => {
        $('#characters').append($( `<img src='${element.image}'/>` ))
      });
    } catch (error) {
      $('#characters').append($( `<p>There was an error loading the characters: ${error.toString()}</p>` ))
    } finally {
      $this.attr('disabled', 'enabled');
    }   
  });
});