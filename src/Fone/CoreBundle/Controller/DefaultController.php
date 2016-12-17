<?php
/**
 * Created by PhpStorm.
 * User: christopher
 * Date: 17/12/16
 * Time: 0:08
 */

namespace Fone\CoreBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;


class DefaultController extends Controller
{
    /**
     * @Route("/", name="core_default_index")
     */
    public function indexAction()
    {
        if ($this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            return $this->redirectToRoute('main_default_index');
        } else {
            return $this->redirectToRoute('fos_user_security_login');
        }
    }

}