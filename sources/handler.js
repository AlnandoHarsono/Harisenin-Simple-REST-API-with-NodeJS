const profile = require('./validate_me');

// ADD HANDLER
const addingProfileHandler = (request, h) => {
  const { name, year} = request.payload;
    var nama1=name;
        firstDigit=nama1.lastIndexOf(" ");
    var tahun=year;
        secondDigit = Number(tahun.toString().substring(2,3));
        thirdDigit = Number(tahun.toString().substring(3))

    if(name === undefined){
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan profil. Mohon isi nama',
    });
    response.code(400);
    return response;
  }

  //Validasi  
  if(year <1900){
    const response = h.response({
      status: 'fail',
      message: 'Tahun minimum 1900',
    });
    response.code(410);
    return response;
  }else if(year >1999){
    const response = h.response({
      status: 'fail',
      message: 'Tahun maximum 1900',
    });
    response.code(411);
    return response;
  }
  if(secondDigit%2==1){
    const response = h.response({
        status: 'fail',
        message: 'Angka Puluhan (digit ketiga) pada Tahun harus genap',
      });
      response.code(412);
      return response;
  }
  if(thirdDigit%2==0){
    const response = h.response({
        status: 'fail',
        message: 'Angka Satuan (digit keempat) pada Tahun harus ganjil',
      });
      response.code(413);
      return response;
  }
//Proses
if(firstDigit<0){
    firstDigit=0;
}
if(secondDigit==2||secondDigit==4||secondDigit==6){
    var second=secondDigit*10;
}else {
    var second=secondDigit*11;
}
if(thirdDigit==1||thirdDigit==3||thirdDigit==5){
    var third=0;
    while(tahun){
        third+= tahun%10;
        tahun=Math.floor(tahun/10);
    }
}else{
    var third=1+9+7+9;
}

const value=String(firstDigit)+String(second)+String(third);
const binary=Number(value).toString(2);
  

  const newProfile = {name,year};
  profile.push(newProfile);
   

  const addTrue = profile.filter((profile) => profile.name === name).length > 0;
  if(addTrue){
    const response = h.response({
      status: 'success',
      message: 'Data profil berhasil ditambahkan',
      data: {
        nama: name,
        tahun: year,
        a:firstDigit,
        b:secondDigit,
        c:thirdDigit,
        d:second,
        e:third,
        f:value,
        g:binary,
      },
    });
    response.code(201);
    return response;
  }

}

module.exports= {addingProfileHandler};
