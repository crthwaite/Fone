<?php

namespace Fone\TransactionBundle\Controller;

use Fone\TransactionBundle\Manager\TransactionManager;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class DefaultController extends Controller
{
    /**
     * @param string $month
     * @param Request $request
     *
     * @Route(
     *     "/spent/most/category/{month}",
     *     name="transaction_default_spent_category_month",
     *     options={"expose": true}
     * )
     * @Template()
     * @return array
     */
    public function spentMostCategoryMonthAction(Request $request, $month)
    {
        $tm = $this->getTransactionManager();
        $month = $this->getNumericMonth($month);
        $result = $tm->findMostSpentCategoryMonth($month);

        return array('result' => $result[0]);
    }

    private function getNumericMonth($month)
    {
        $month = strtolower(trim($month));
        $num = 0;

        switch ($month) {
            case 'enero':
                $num = 1;
                break;
            case 'febrero':
                $num = 2;
                break;
            case 'marzo':
                $num = 3;
                break;
            case 'abril':
                $num = 4;
                break;
            case 'mayo':
                $num = 5;
                break;
            case 'junio':
                $num = 6;
                break;
            case 'julio':
                $num = 7;
                break;
            case 'agosto':
                $num = 8;
                break;
            case 'setiembre':
                $num = 9;
                break;
            case 'octubre':
                $num = 10;
                break;
            case 'noviembre':
                $num = 11;
                break;
            case 'diciembre':
                $num = 12;
                break;
        }

        return $num;
    }

    /** @return TransactionManager */
    private function getTransactionManager()
    {
        return $this->get('transaction.transaction_manager');
    }
}