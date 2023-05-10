function init() {
    $('#submit_btn').click(function(event){
        event.preventDefault();
        query = $('#queryinput').val();
        console.log(query);
        comp = `<div class="bd-qustion" style = 'background-color: aliceblue; padding : 10px' >            
        <form id = 'row' class="row">
            <div class="col-11">
                <input type="query" class="form-control w-100" id="queryinput" placeholder="type here" style = 'border-radius: 2; background-color: aliceblue;'>
            </div>
            <div class="col-1">
                <button id="submit_btn" class="btn btn-outline-success w-100" >submit</button>
            </div>
        </form>
        <div id="queryinput" class="form-text">
            e.g. give me a summary report of Tesla in last 24hrs
        </div>
    </div>`
        
        $.getJSON('/api?query='+query, function() {
            target = $('#container');
            div = "<div class = 'bd-answer p-3' style = 'background-color:lightblue; font-family: sans-serif; font-weight : bold;color: white;'> Here is the report <br></div>"
            target.append(div);
            $('#row').empty()
            $('#row').append(query)
            $('#queryinput_eg').empty()
            target.append(comp)
          });
        // data.result.forEach(v => $('#mylist').append('<li>'+v+'</li>'));
    }
    )


    console.log('document is ready');
}

$(document).ready(init);

        // platform = []; $('input[name=cb_platform]:checked').each((i,v) => platform.push(v.value))
        // genre = []; $('input[name=cb_genre]:checked').each((i,v) => genre.push(v.value))
        // publisher = []; $('input[name=cb_publisher]:checked').each((i,v) => publisher.push(v.value))
        // p = $.param({mode: 'games', platform: platform.join('|'), genre: genre.join('|'), publisher: publisher.join('|')})
        // console.log(p)
        // $.getJSON('/api2?'+p, data => {
        //   target = $('#games tbody')
        //   target.empty()
        //   data.result.forEach(r => target.append('<tr><td>'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td>'+r[3]+'</td><td>'+r[4]+'</td><td>score figure</td></tr>'))
        // }
//         )
//       })
// }