function creategrid()
{
  var a=[];
  for(var i =0;i<4;i++)
  {
   var row=[]
   for(var j =0;j<4;j++)
     {
        row.push(0);
     }
  a.push(row);

  }
  return a;
}

function updategrid(a)
{

  for(var i =1;i<5;i++)
  {
     var n = i.toString();
     for(var j =1;j<5;j++)
     {
        var m = j.toString();
       var temp=n+m;
        //console.log(temp);

       var div = document.getElementById(temp);
       if(a[i-1][j-1]!==0)
       div.innerText = a[i-1][j-1];
       else
         div.innerText="";
     }

  }
  updatecolor(a);
  updatescore(a);

}
 var score=0;
function updatescore(a)
{
  var sco = document.getElementById("score-box");
  sco.innerText = score;

}
function updatecolor(a)
{

  for(var i =1;i<5;i++)
  {
     var n = i.toString();
     for(var j =1;j<5;j++)
     {
        var m = j.toString();
       var temp=n+m;
       var div = document.getElementById(temp);
       if(a[i-1][j-1]===2)
       div.className = "two";
       else if(a[i-1][j-1]===0)
         div.className = "zero";
       else if(a[i-1][j-1]===4)
         div.className = "four";
       else if(a[i-1][j-1]===8)
         div.className = "eight";
       else if(a[i-1][j-1]===16)
         div.className = "sixteen";
       else if(a[i-1][j-1]===32)
         div.className = "b32";
       else if(a[i-1][j-1]===64)
         div.className = "b64";
       else if(a[i-1][j-1]===128)
         div.className = "b128";
       else if(a[i-1][j-1]===256)
         div.className = "b256";
       else if(a[i-1][j-1]===512)
         div.className = "b512";
       else if(a[i-1][j-1]===1024)
         div.className = "b1024";
       else if(a[i-1][j-1]===2048)
         div.className = "b2048";

       else
          div.className = "else";
     }

  }

}


function getEmptyPositions(grid)
{
    var emptyPositions = [];

    for (var x = 0; x < 4; x++) {
        for (var y = 0; y < 4; y++) {
            if (grid[x][y] === 0) {
                emptyPositions.push({ x: x, y: y });
            }
        }
    }

    return emptyPositions;
};
var addRandomTile = function(grid) {
    var emptyPositions = getEmptyPositions(grid);
    var n = Math.floor(Math.random()* (emptyPositions.length));
    //console.log(emptyPositions.length);
  var position = emptyPositions[n];

  grid[position.x][position.y] = 2;


};
function moveleft(a)
{


  for(var i =0;i<4;i++)
  {
     for(var j =0;j<3;j++)
     {
        if(a[i][j]===0)
          {
            var temp=a[i][j+1];
            a[i][j+1]=a[i][j];
            a[i][j]=temp;


          }

     }

  }


};
function mergeleft(a)
{


  for(var i =0;i<4;i++)
  {
     for(var j =0;j<3;j++)
     {
        if(a[i][j]===a[i][j+1] && a[i][j]!==0)
         {

            a[i][j]=2*a[i][j];
            a[i][j+1]=0;
           score+=a[i][j];
         }

     }

  }


};

function mainmoveleft(grid)
{

  for(var i=0;i<4;i++)
  {
   moveleft(a);
  }
  mergeleft(a);
  for(i=0;i<4;i++)
  {
    moveleft(a);
  }

};

function rotateGrid(grid,reverse) {
    var newGrid = [];

    for (var y = 0; y < 4; y++) {
        var row = [];
        for (var x = 0; x < 4; x++) {
            var nx = reverse ? x : 4 - x - 1;
            var ny = reverse ? 4 - y - 1 : y;
            row.push(grid[nx][ny]);
        }
        newGrid.push(row);
    }

    return newGrid;
};
function returnduplicate(a)
{
     var x=[];
      for(var i =0;i<4;i++)
      {
         var row=[]
         for(var j =0;j<4;j++)
         {
          row.push(a[i][j]);
         }
        x.push(row);

      }
  return x;
}
function compare(a,b)
{

      for(var i =0;i<4;i++)
      {

         for(var j =0;j<4;j++)
         {
          if(a[i][j]!==b[i][j]){
            return false;
          }
         }


      }
  return true;
}
var a=creategrid();
addRandomTile(a);
addRandomTile(a);
updategrid(a);
document.onkeydown = checkKey;
function checkKey(e) {

    if (e.keyCode == '38')//up
    {
      var x=returnduplicate(a);
      a=rotateGrid(a,true);//true anti
      mainmoveleft(a);
      a=rotateGrid(a);
      var y=returnduplicate(a);
      if(!compare(x,y))
      {
        addRandomTile(a);
      }
      updategrid(a);

    }
    else if (e.keyCode == '40') //down
    {
      var x=returnduplicate(a);
      a=rotateGrid(a);
      mainmoveleft(a);
      a=rotateGrid(a,true);//true anti
      var y=returnduplicate(a);

      if(!compare(x,y))
      {
        addRandomTile(a);
      }
      updategrid(a);
    }
    else if (e.keyCode == '37')// left arrow
    {

      var x=returnduplicate(a);
      mainmoveleft(a);
      var y=returnduplicate(a);

      if(!compare(x,y))
      {
        addRandomTile(a);
      }


      updategrid(a);

    }
    else if (e.keyCode == '39')// right arrow
    {
      var x=returnduplicate(a);

      a=rotateGrid(a,true);
      a=rotateGrid(a,true);
       mainmoveleft(a);
       a=rotateGrid(a);
       a=rotateGrid(a);
      var y=returnduplicate(a);

      if(!compare(x,y))
      {
        addRandomTile(a);
      }
      updategrid(a);
    }

};



