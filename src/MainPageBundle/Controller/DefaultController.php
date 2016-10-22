<?php

namespace MainPageBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\BrowserKit\Response;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('MainPageBundle:Default:main.html.twig');
        //return new Response('Annyang');
    }
}
