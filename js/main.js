let data=[]
let mealTitle=[]
let mealImg=[]

$(window).on("load",function()
{
    $(".loader").fadeOut(1000);
    $(".main-page").fadeIn(1000)
})





$(".open-icon").on("click",function()
{
    let width=$(".side-menu").outerWidth();
    let left=$(".nav-menu").css('left')
    if(left=="0px")
    {
        $(".nav-menu").animate({left:`-${width}px`},2000)
        $("i",this).removeClass("fa-solid fa-xmark fa-align-justify fa-2x");
        $("i",this).addClass("fa-solid open-close-icon fa-align-justify fa-2x");

    }
    else
    {
        $(".nav-menu").animate({left:0},1500)
        $("i",this).removeClass("fa-solid open-close-icon fa-align-justify fa-2x");
        $("i",this).addClass("fa-solid fa-xmark fa-align-justify fa-2x");
    }

})

async function getMeals()
{
    let req=await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
    data = await req.json()
    showMeals()
}

async function getData(id)
{
   


    let Request =await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    let data2 = await Request.json()
    console.log(data2);
  let ing=[]
    let ingred=``
  for(var i=1;i<=20;i++)
  {
    ing.push(data2.meals[0][`strMeasure${i}`] +" "+ data2.meals[0][`strIngredient${i}`])
  }
  console.log(ing);

  for(var j=0;j<ing.length;j++)
  {
    if(ing[j]!=="  " && ing[j]!=="null null" && ing[j]!=" ")
    {
        ingred+= `<li class="alert alert-info m-2 p-1">${ing[j]}</li>`

    }
  }
 


    temp=""
    temp+=`<div class="col-md-4">
    <img src="${data2.meals[0].strMealThumb}" class="rounded-3 img-item " alt="">
    <h3 class="text-white ">${data2.meals[0].strMeal}</h3>
</div>
<div class="col-md-8">
                    <h2 class="text-white ">Instructions</h2>
                    <p class="text-white ">${data2.meals[0].strInstructions}</p>
                    <h3 class="text-white ">Area : ${data2.meals[0].strArea}</h3>
                    <h3 class="text-white ">Category : ${data2.meals[0].strCategory}</h3>
                    <h3 class="text-white ">Recipes : </h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap" id="recipeList">
                    ${ingred}
                    </ul>
                   
                    <h4 class="text-white ">Tags :</h4>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
                        
                    </ul>

                    <a href="${data2.meals[0].strSrc}" class="btn btn-success ">Source</a>
                    <a href="${data2.meals[0].strYoutube}" class="btn btn-danger ">Youtube</a>



                </div>
`
var myBlock = document.getElementById("section-item");
if(myBlock.style.display="none")
{
    myBlock.style.display="block"
    $(".main_page").addClass("d-none")
    document.getElementById("item-in").innerHTML=temp

}
 



}

function showMeals()
{
    temp=""
    for(var i=0;i<data.meals.length;i++)
    {
        mealTitle.push(data.meals[i].strMeal)
        mealImg.push(data.meals[i].strMealThumb)
        temp+=`<div class="col-md-3">
        <div class="meal-item position-relative overflow-hidden rounded-3" onclick="getData(${data.meals[i].idMeal})">
            <img src="${mealImg[i]}" class="w-100" alt="">
            <div class=" meal-layer position-absolute d-flex align-items-center justify-content-center text-black p-2 ">
                <h3>${mealTitle[i]}</h3>
            </div>
        </div>
    </div>`
    }
    document.getElementById("Data").innerHTML=temp
}
getMeals()
