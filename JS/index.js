var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var siteContainer = [];

if (localStorage.getItem("Site") !== null) {
  siteContainer = JSON.parse(localStorage.getItem("Site"));
  display();
}

function AddSite() {
  var sitename = siteName.value;
  var siteurl = siteUrl.value;
  if (siteContainer.some((site) => site.SiteName === sitename)) {
    // console.log("error");
    return;
  }
  var site = {
    SiteName: sitename,
    SiteURL: siteurl,
  };

  siteContainer.push(site);
  localStorage.setItem("Site", JSON.stringify(siteContainer));
  Clear();
  display();
}
function Clear() {
  siteName.value = "";
  siteUrl.value = "";
}
function display() {
  var container = "";
  for (var i = 0; i < siteContainer.length; i++) {
    container += `<tr>
            <th scope="row">${i + 1}</th>
            <td>${siteContainer[i].SiteName}</td>


            

 <td>
      <button class="btn btn-success"><a href="${
        siteContainer[i].SiteURL
      }" target="_blank" class="text-decoration-none text-white"><i class="fa-solid fa-eye pe-2"></i> Visit</a></button>
    </td>
           <td>
  <button class="btn btn-danger" onclick="DeleteSite(${i})">
    <i class="fa-solid fa-trash-can pe-2"></i>Delete
  </button>
</td>

          </tr>`;
  }
  document.getElementById("tbody").innerHTML = container;
}

function DeleteSite(index) {
  siteContainer.splice(index, 1);
  localStorage.setItem("Site", JSON.stringify(siteContainer));
  display();
}
function validateInputs(ele) {
  var regex = {
    siteName: /^\w{3,}(\s+\w+)*$/,
    siteUrl: /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/,
  };
  if (regex[ele.id].test(ele.value)) {
    ele.classList.add("is-valid");
    ele.classList.remove("is-invalid");
  } else {
    ele.classList.add("is-invalid");
    ele.classList.remove("is-valid");
  }
}
Swal.fire({
  title: "Error!",
  text: "Do you want to continue",
  icon: "error",
  confirmButtonText: "Cool",
});
