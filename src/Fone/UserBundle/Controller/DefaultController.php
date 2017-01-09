<?php

namespace Fone\UserBundle\Controller;

use Fone\UserBundle\Manager\AccountManager;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class DefaultController extends Controller
{
    /**
     * @Route("/user/amount", name="user_default_amount", options={"expose"=true})
     * @Template()
     */
    public function getAccountAmountAction()
    {
        $user = $this->getUser();

        $am = $this->getAccountManager();
        $result = $am->getAmountByUser($user);

        return array("money" => $result);
    }

    /** @return AccountManager */
    private function getAccountManager()
    {
        return $this->get('user.account_manager');
    }
}