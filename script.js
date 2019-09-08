
let fetchRepo = debounce(fetchUserRepo, 300);
function debounce(func, delay) { 
    let debounceTimer; 
    return function() { 
        const context = this
        const args = arguments 
            clearTimeout(debounceTimer) 
                debounceTimer 
            = setTimeout(() => func.apply(context, args), delay) 
    } 
}  

function resetfirst()
{
    document.getElementById('repos').innerHTML = '';
    document.getElementById('input1').value = '';
}

function resetSecond()
{
    document.getElementById('repos').innerHTML = '';
    document.getElementById('input2').value = '';
}

async function fetchUserRepo(repoInput)
{
    try{
        const user = repoInput.value;
        if(user === '')
        {
            resetfirst();
            return;
        }
        
        document.getElementById('repos').innerHTML = '';
        let loader = document.createElement('div');
        loader.className = "loader";
        document.getElementById('repos').appendChild(loader);
        
        const response = await fetch(`https://api.github.com/users/${user}/repos`);
        if(response.status === 200)
        {
            const data = await response.json();
            if(data.length === 0)
            {
                document.getElementById('repos').innerHTML = '';
                let new_row = document.createElement('div');
                new_row.className = "repoDiv";
                let a = document.createElement("A");
                let t = document.createTextNode('No Repository Found for given user');
                a.appendChild(t);
                new_row.appendChild(a);
                document.getElementById('repos').appendChild(new_row);
                return;
            }
            document.getElementById('repos').innerHTML = '';
            for(let i=0; i< data.length; i++)
            {
                let new_row = document.createElement('div');
                new_row.className = "repoDiv";
                let a = document.createElement("A");
                let t = document.createTextNode(data[i].name);
                a.setAttribute("href", data[i].html_url);
                a.appendChild(t);
                new_row.appendChild(a);
                document.getElementById('repos').appendChild(new_row);
            }
        }else
        {
            document.getElementById('repos').innerHTML = '';
            let new_row = document.createElement('div');
            new_row.className = "repoDiv";
            let a = document.createElement("A");
            let t = document.createTextNode('No Repository Found for given user');
            a.appendChild(t);
            new_row.appendChild(a);
            document.getElementById('repos').appendChild(new_row);
        }
    }catch(e)
    {
        document.getElementById('repos').innerHTML = '';
        let new_row = document.createElement('div');
        new_row.className = "repoDiv";
        let a = document.createElement("A");
        let t = document.createTextNode('No Repository Found for given user');
        a.appendChild(t);
        new_row.appendChild(a);
        document.getElementById('repos').appendChild(new_row);
    }
}

function search() {
    let input, filter, repos, repoDiv, a, i, txtValue;
    input = document.getElementById("input2");
    filter = input.value.toUpperCase();
    repos = document.getElementById("repos");
    repoDiv = repos.getElementsByClassName("repoDiv");
    for (i = 0; i < repoDiv.length; i++) {
      a = repoDiv[i].getElementsByTagName("a")[0];
      if (a) {
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            repoDiv[i].style.display = "";
        } else {
            repoDiv[i].style.display = "none";
        }
      }       
    }
  }
