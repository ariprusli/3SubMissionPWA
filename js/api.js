var base_url = "https://api.football-data.org/v2/";
  
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    
    return Promise.reject(new Error(response.statusText));
  } else {
    
    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}

function error(error) {
  
  console.log("Error : " + error);
}
//request data Json
function getArticles() {
  if ("caches" in window) {
    caches.match(base_url + "teams")
    .then(function(response) {
      if (response) {
        response.json().then((data) => {
            var articlesHTML = "";
            data.teams.forEach((article) => {
              articlesHTML += `
                    <div class="card">
                        <a href="./article.html?id=${article.id}">
                          <div class="card-image waves-effect waves-block waves-light">
                            <img src="${article.crestUrl.replace(/^http:\/\//i, 'https://')}" />
                          </div>
                        </a>
                        <div class="card-content">
                          <span class="card-title truncate">${article.name}</span>
                          <p>${article.venue}</p>
                        </div>
                    </div>
                `;
            });
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("articles").innerHTML = articlesHTML;
          });
      }
    });
  }

  fetch(base_url + "teams",{
    headers: {
      'X-Auth-Token': '41f6f1c817d14d6ea36e513375498e72'
    },
  })
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.

      // Menyusun komponen card artikel secara dinamis
      var articlesHTML = "";
      data.teams.forEach((article) => {
          articlesHTML += `
              <div class="card">
                <a href="./article.html?id=${article.id}">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="${article.crestUrl.replace(/^http:\/\//i, 'https://')}" />
                  </div>
                </a>
                <div class="card-content">
                  <span class="card-title truncate">${article.name}</span>
                  <p>${article.venue}</p>
                </div>
              </div>
            `;
        });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("articles").innerHTML = articlesHTML;
    })
    .catch(error);
}

function getArticleById() {
  return new Promise((resolve, reject) => {
      // Ambil nilai query parameter (?id=)
      var urlParams = new URLSearchParams(window.location.search);
      var idParam = urlParams.get("id");
      if ("caches" in window) {
        caches.match(base_url + "teams/" + idParam).then(function (response) {
          if (response) {
            response.json().then(function (data) {

              console.log(data);
              var articleHTML = `
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img src="${data.crestUrl.replace(/^http:\/\//i, 'https://')}" />
              </div>
              <div class="card-content">
                <span class="card-title truncate" style="text-align: center;">${data.name}</span>
                ${snarkdown(data.venue)}
                <p>${data.email}</p>
                <p>${data.website}</p>
              </div>
            </div>
          `;

              document.getElementById("body-content").innerHTML = articleHTML;
              // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
              resolve(data);
            });
          }
        });
      }
      fetch(base_url + "teams/" + idParam, {
        headers: {
          'X-Auth-Token': '41f6f1c817d14d6ea36e513375498e72'
        },
      })
        .then(status)
        .then(json)
        .then((data) => {
          // Objek JavaScript dari response.json() masuk lewat variabel data.
          console.log(data);
          // Menyusun komponen card artikel secara dinamis
          var articleHTML = `
            <div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                  <img src="${data.crestUrl.replace(/^http:\/\//i, 'https://')}" />
                </div>
                <div class="card-content">
                  <span class="card-title truncate" style="text-align: center;">${data.name}</span>
                  ${snarkdown(data.venue)}
                  <p>${data.email}</p>
                  <p>${data.website}</p>
                </div>
            </div>
            
          `;

          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("body-content").innerHTML = articleHTML;
          // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
          resolve(data);
        });
    });
} 

function getSavedArticles(){
  getAll().then((articles) => {
      console.log(articles);

      var articlesHTML = "";
      articles.forEach(function (article) {
        articlesHTML += `
      <div class="card">
      <a href="./article.html?id=${article.id}&saved=true">
        <div class="card-image waves-effect waves-block waves-light">
          <img src="${article.crestUrl}" />
        </div>
      </a>
      <div class="card-content">
        <span class="card-title truncate">${article.name}</span>
        <p>${article.venue}</p>
      </div>
    </div>
      `;

      });

      document.getElementById("articles").innerHTML = articlesHTML;
    });
}

async function getSavedArticleById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  
  await getById(parseInt(idParam))
  .then((article) => {
    console.log(idParam);
    console.log(article);
      articleHTML = '';
      var articleHTML = `
    <div class="card">
      <div class="card-image waves-effect waves-block waves-light">
        <img src="${article.crestUrl}" />
      </div>
      <div class="card-content">
        <span class="card-title truncate" style="text-align: center;">${article.name}</span>
        ${snarkdown(article.venue)}
                <p>${article.email}</p>
                <p>${article.website}</p>
      </div>
    </div>
  `;
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("body-content").innerHTML = articleHTML;
    });
}