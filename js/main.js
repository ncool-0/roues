const lots =[
    {
        image : 'tresor1.png',
        name :  'You Win Tresor1',
        points : 0,
        weight : 3
    },
    {
        image : 'tresor2.png',
        name: 'You Win Tresor2',
        points : 0,
        weight : 2
    },
    {
        image : 'tresor03.png',
        name: 'You Win Tresor3',
        points : 0,
        weight : 1
    },
    {
        image : 'pieces.png',
        name: 'You Win Tresor4',
        points : 0,
        weight : 10
    },
    {
        image : 'pieces2.png',
        name: 'You Win Tresor5',
        points : 0,
        weight : 10
    },
    {
        image : 'pieces3.png',
        name: 'You Win Tresor6',
        points : 0,
        weight : 8  
    },
];

const popup= document.getElementById('popup');
const popup_img = document.getElementById('popup_img');
const popup_title = document.getElementById('popup_title');
popup.addEventListener('click',()=>{ 
    popup.classList.remove('show');
})

const imgs_width = 130;

let imgs_count = Math.ceil(window.innerWidth/imgs_width);

const displayed_lots = [];
for (let i=0;i<imgs_count*3 || i<lots.length;i++){

    let lot = lots[i%lots.length];
    displayed_lots.push(lot);
}

const resultat = document.getElementById('resultat');
displayed_lots.forEach(lot=>{
    let div = document.createElement('DIV');
    let img = new Image();
    img.src = 'images/'+lot.image;
    img.classList.add('image');

    div.appendChild(img);
    div.classList.add('lotimg');

    resultat.appendChild(div);
});

let initial_cursor_position = (displayed_lots.length/3)%lots.length;
let cursor = null;
let wheel_animation = null;
let selected_lot;
const wheelTurn = ()=>{
    wheel_animation = document.getElementById("resultat").animate(
        [
            {
                transform:"translateX(-"+(imgs_width*lots.length)+"px)"
            }
        ],
        {
            duration: 400,
            iterations: 5
        },

    );
    wheel_animation.addEventListener('finish',()=>{

        wheel_animation.cancel();

        let weighted_lots = [];

        lots.forEach((lot,index)=>{
            for(let i=0;i<lot.weight;i++){
                weighted_lots.push(index);
            }
        });
        
        let selected_weighted_lot = Math.round(Math.random()*(weighted_lots.length-1)); 
        selected_lot = weighted_lots[selected_weighted_lot];
        cursor =  (selected_lot - initial_cursor_position)+lots.length;
        let  wheel_position = ((imgs_width*cursor)+(imgs_width*0.5));
        console.log(selected_lot);
        wheel_animation = document.getElementById("resultat").animate(
            [
                {
                    transform:"translateX(-"+wheel_position+"px)"
                }
            ],
            {
                duration: 600,
                fill: 'forwards',
                easing: 'ease-out'
            
            },
        );
        wheel_animation.addEventListener('finish',()=>{
            wheel_animation.commitStyles();
            wheel_animation.cancel();
         
            popup_img.src = 'images/'+lots[selected_lot].image;
            popup_title.innerText = lots[selected_lot].name;
            popup.classList.add('show');   

            
        })
      
    });
}

const bouton = document.getElementById('bouton');
bouton.addEventListener('click',(e)=>{
    if (cursor !=null ){
        
        cursor =  (0 - initial_cursor_position)+lots.length;
        let  wheel_position = ((imgs_width*cursor));
        
        
        wheel_animation = document.getElementById('resultat').animate(
            [
                {
                    transform:"translateX(-"+(wheel_position)+"px)"
                }
            ],
            {
                duration: 100,
                fill: 'forwards',
            },     
        );
        wheel_animation.addEventListener('finish',()=>{
            resultat.style.transform = 'translateX(0)';
            wheel_animation.cancel();
            
            wheelTurn();
        });
    }else {
        wheelTurn();
    } 
});
