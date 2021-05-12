<?php

$command = $_GET['command'];

if ($command == "dier"){
    procesDier();
}


def procesDier(){
    $dier = $_GET['dier'];
    switch($dier) {
        case "geit":
            header("Location: http://www.kleinvossenpark.be/Info/Soort/Geit.html");
            break;
        case "lama":
            header("Location: http://www.kleinvossenpark.be/Info/Lama.html");
            break;
        case "alpaca":
            header("Location: http://www.kleinvossenpark.be/Info/Alpaca.html");
            break;
        case "wolvarken":
            header("Location: http://www.kleinvossenpark.be/Info/Wolvarken.html");
            break;
        case "emoe":
            header("Location: http://www.kleinvossenpark.be/Info/Emoe.html");
            break;
        case "nandoe":
            header("Location: http://www.kleinvossenpark.be/Info/Soort/Nandoe.html");
            break;
        case "koe":
            header("Location: http://www.kleinvossenpark.be/Info/Koe.html");
            break;
        case "hangbuikzwijn":
            header("Location: http://www.kleinvossenpark.be/Info/Hangbuikzwijn.html");
            break;
        case "ezel":
            header("Location: http://www.kleinvossenpark.be/Info/Ezel.html");
            break;
        case "paard":
            header("Location: http://www.kleinvossenpark.be/Info/Paard.html");
            break;
        case "gans":
            header("Location: http://www.kleinvossenpark.be/Info/Soort/Gans.html");
            break;
        case "schaap":
            header("Location: http://www.kleinvossenpark.be/Info/Schaap.html");
            break;
        case "minipaard":
            header("Location: http://www.kleinvossenpark.be/Info/minipaard.html");
            break;
        case "shetlander":
            header("Location: http://www.kleinvossenpark.be/Info/shetlander.html");
            break;
        case "pauw":
            header("Location: http://www.kleinvossenpark.be/Info/pauw.html");
            break;
        case "duif":
            header("Location: http://www.kleinvossenpark.be/Info/duif.html");
            break;
        default:
            header("Location: http://www.kleinvossenpark.be/404.html");
    }
}



?>