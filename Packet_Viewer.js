//テキストボックスに入力した文字列を格納するグローバル変数を用意する
var str;


//テキストボックスの文字を取得し,パケットヘッダを構造ごとに分ける
function tbox(){

  str=document.js.txtb.value;

  var ipv = Number(str.substring(0,1)); //元々文字列であるものを数字に変更する
  
  /*IPv4とIPv6かによって処理内容を変える
   *パケットヘッダのバージョン部分を使用する
   */

   //IPv4用の処理
  if(ipv == 4){

    //バージョン(Version)
    var version_v4 = str.substring(0,1); //ここでは文字列として認識させる
    document.querySelector("#version_v4").innerHTML=version_v4;

    //ヘッダ長(Internet Header Length)
    var ihl = str.substring(1,2);
    var ihl_num = Number(ihl); //ヘッダ長の文字列を数字に変換したもの
    document.querySelector("#ihl").innerHTML=ihl;

    //サービスタイプ(Type Of Service)
    var tos = str.substring(2,4);
    document.querySelector("#tos").innerHTML=tos;

    //パケット長(Total Length)
    var totallength = str.substring(4,8);
    document.querySelector("#totallength").innerHTML=totallength;

    //識別子(Identification)
    var identification = str.substring(8,12);
    document.querySelector("#identification").innerHTML=identification;

    //フラグ(Various Control Flags)
    var vcf = str.substring(12,16);
    document.querySelector("#vcf").innerHTML=vcf;

    //TTL(Time to Live 生存時間)
    var ttl = str.substring(16,18);
    
    if(protocol = '01'){
    //TTLからOSを判別する機能(プロトコルがICMPの場合のみ対応している機能)
      switch(ttl){
        //16進数を'80'を10進数に直すと'128' これはWindowsのもの
        case '80':
        var ttl_os = "Windows";
        break;

        //16進数'40'を10進数に直すと'64' これはUNIXおよびLinux系のもの
        case '40':
        var ttl_os = "MacOSまたはLinux";
        break;

        //16進数'ff'を10進数に直すと'255'
        case 'ff':
        var ttl_os = "Solaris(商用UNIX)";

        default:
        var ttl_os = "このパケットからはOSを判別できません";
      }
    }else{
      //ICMPパケット以外は動作しない
    }

    var ttl_final = ttl + "(" + ttl_os + ")";
    document.querySelector("#ttl_final").innerHTML=ttl_final;


    //プロトコル(protocol)
    var protocol = str.substring(18,20);
    
    /*プロトコル番号によりどんなパケットなのかを判別
      ここを拡張することで認識できるプロトコルが増える*/
    switch(protocol){
      case '11':
      var protocol_name = "UDP";
      break;

      case '01':
      var protocol_name = "ICMP";
      break;

      default:
      var protocol_name = "このプロトコルは登録されていません";
    }
    var protocol_final = protocol + "(" + protocol_name + ")";
    document.querySelector("#protocol_final").innerHTML=protocol_final;


    //チェックサム(Header Checksum)
    var hc = str.substring(20,24);
    document.querySelector("#hc").innerHTML=hc;

    /*送信元アドレス(Sourse Address)
    16進数のままの送信元アドレスを変数に格納する*/
    var sa_v4 = str.substring(24,32);

    //第1サブネット~第4サブネットをサブネットごとに分けて格納する
    var sa1_v4 = str.substring(24,26);
    var sa2_v4 = str.substring(26,28);
    var sa3_v4 = str.substring(28,30);
    var sa4_v4 = str.substring(30,32);

    //サブネットごとに格納された16進数を10進数に変換する
    sa1_v4 = parseInt(sa1_v4,16);
    sa2_v4 = parseInt(sa2_v4,16);
    sa3_v4 = parseInt(sa3_v4,16);
    sa4_v4 = parseInt(sa4_v4,16);

    var sa_final_v4 = sa_v4 + " -> " + sa1_v4 + '.' + sa2_v4 + '.' + sa3_v4 + '.' + sa4_v4;
    document.querySelector("#sa_final_v4").innerHTML=sa_final_v4;

    /*宛先アドレス(Destination Address)
    16進数のままの宛先アドレスを変数に格納する*/
    var da_v4 = str.substring(32,40);

    //第1サブネット~第4サブネットをサブネットごとに分けて格納する
    var da1_v4 = str.substring(32,34);
    var da2_v4 = str.substring(34,36);
    var da3_v4 = str.substring(36,38);
    var da4_v4 = str.substring(38,40);

    //サブネットごとに格納された16進数を10進数に変換する
    da1_v4 = parseInt(da1_v4,16);
    da2_v4 = parseInt(da2_v4,16);
    da3_v4 = parseInt(da3_v4,16);
    da4_v4 = parseInt(da4_v4,16);

    var da_final_v4 = da_v4 + " -> " +da1_v4 + '.' + da2_v4 + '.' + da3_v4 + '.' + da4_v4;
    document.querySelector("#da_final_v4").innerHTML=da_final_v4;

    //オプション(option)
    if(ihl_num > 5){
      var option=str.substring(40,(40+8*(ihl_num-1)));  
    }else{
      var option = "オプションはありません";
    }
    document.querySelector("#option").innerHTML=option;

    //データ(data)
    if(ihl_num > 5){
      var data_v4=str.substring(48);  
    }else{
      var data_v4 = str.slice(40);
    }
    document.querySelector("#data_v4").innerHTML=data_v4;
    

    //パケットを入力後に注意書きをアラートする
    if(ihl_num == 6){
      alert("あなたの入力したパケットはIPv4です.\nヘッダ長が"+ihl+"で5を超えているのでオプションが追加されます.");
    }else{
      alert("あなたの入力したパケットはIPv4です.\nヘッダ長が"+ihl+"なのでオプションはありません.");
    }

    if(protocol == '01'){
      alert("これは" + ttl_os + "の"+ protocol_name +"パケットである可能性が高いです.");
    }else{
      
    }

    

  //IPv6用の処理
  }else if(ipv == 6){
   
    //バージョン(Version)
    var version_v6 = str.substring(0,1); //ここでは文字列として認識させる
    document.querySelector("#version_v6").innerHTML=version_v6;

    //トラフィッククラス(Traffic class)
    var tc = str.substring(1,3);
    document.querySelector("#tc").innerHTML=tc;

    //フローラベル(Flow Label)
    var fl = str.substring(3,8);
    document.querySelector("#fl").innerHTML=fl;

    //ペイロード長(Payload)
    var payload = str.substring(8,12);
    document.querySelector("#payload").innerHTML=payload;

    //ネクストヘッダ(Next header)
    var nh = str.substring(12,14);
    /*ネクストヘッダによってプロトコルを判別する
    ここを拡張することにより対応プロトコルを増やせる*/
    switch(nh){
      case '3a':
      var nh_name = "ICMPv6";
      break;

      default:
      var nh_name = "このプロトコルは登録されていません.";
    }
    var nh_final = nh + "(" + nh_name + ")";
    document.querySelector("#nh_final").innerHTML=nh_final;



    //ホップリミット(Hop Limit)
    var hl = str.substring(14,16);

    if(nh = '3a'){
      //TTLからOSを判別する機能(プロトコルがICMPv6の場合のみ対応している機能)
        switch(hl){
          //16進数を'80'を10進数に直すと'128' これはWindowsのもの
          case '80':
          var hl_os = "Windows";
          break;
  
          //16進数'40'を10進数に直すと'64' これはUNIXおよびLinux系のもの
          case '40':
          var hl_os = "MacOSまたはLinux";
          break;
  
          //16進数'ff'を10進数に直すと'255'
          case 'ff':
          var hl_os = "Solaris(商用UNIX)";
  
          default:
          var hl_os = "このパケットからはOSを判別できません";
        }
      }else{
        //ICMPv6パケット以外は動作しない
      }

    var hl_final = hl + "(" + hl_os + ")";
    document.querySelector("#hl_final").innerHTML=hl_final;

    /*送信元アドレス(Sourse Address)
    16進数のままの送信元アドレスを変数に格納する*/
    var sa_v6 = str.substring(16,48);

    //第1サブネット~第8サブネットをsa1~sa4のようににサブネットごとに分けて格納する
    var sa1_v6 = str.substring(16,20);
    var sa2_v6 = str.substring(20,24);
    var sa3_v6 = str.substring(24,28);
    var sa4_v6 = str.substring(28,32);
    var sa5_v6 = str.substring(32,36);
    var sa6_v6 = str.substring(36,40);
    var sa7_v6 = str.substring(40,44);
    var sa8_v6 = str.substring(44,48);

    /*
    IPv4とは違いもともと16進数なのでそのまま表示する(IPv4のような変換作業なし)
    */

    var sa_final_v6 = sa_v6 + " -> " + sa1_v6 + ':' + sa2_v6 + ':' + sa3_v6 
    + ':' + sa4_v6 + ':' + sa5_v6 + ':' + sa6_v6 + ':' + sa7_v6 + ':' + sa8_v6;
    document.querySelector("#sa_final_v6").innerHTML=sa_final_v6;

    /*宛先アドレス(Destination Address)
    16進数のままの宛先アドレスを変数に格納する*/
    var da_v6 = str.substring(48,80);

    //第1サブネット~第4サブネットをda1~da4のようににサブネットごとに分けて格納する
    var da1_v6 = str.substring(48,52);
    var da2_v6 = str.substring(52,56);
    var da3_v6 = str.substring(56,60);
    var da4_v6 = str.substring(60,64);
    var da5_v6 = str.substring(64,68);
    var da6_v6 = str.substring(68,72);
    var da7_v6 = str.substring(72,76);
    var da8_v6 = str.substring(76,80);

    /*
    IPv4とは違いもともと16進数なのでそのまま表示する(IPv4のような変換作業なし)
    */
   
    var da_final_v6 = da_v6 + " -> " + da1_v6 + ':' + da2_v6 + ':' + da3_v6 
    + ':' + da4_v6 + ':' + da5_v6 + ':' + da6_v6 + ':' + da7_v6 + ':' + da8_v6;
    document.querySelector("#da_final_v6").innerHTML=da_final_v6;

    //データ(data)
    var data_v6 = str.slice(80);
    document.querySelector("#data_v6").innerHTML=data_v6;
    
    //入力に対するお知らせをアラートする
    alert("あなたの入力したパケットはIPv6のものです.");

    if(nh == '3a'){
      alert("これは" + hl_os + "の"+ nh_name +"パケットである可能性が高いです.");
    }else{
      //ICMPv6のとき以外は動作しない
    }
  }else{
    document.write("入力されたパケットはIPv4でもIPv6でもありません.");
  }

  //ブラウザの機能を使ってデバッグをするためのもの
  console.log("進捗確認");
}

//テキストボックスの文字を消す
function clr(){
  document.js.txtb.value="";
}
