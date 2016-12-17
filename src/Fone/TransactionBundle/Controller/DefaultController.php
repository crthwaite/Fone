<?php

namespace Fone\TransactionBundle\Controller;

use Doctrine\ODM\MongoDB\DocumentManager;
use Fone\TransactionBundle\Manager\TransactionManager;
use Fone\UserBundle\Document\Account;
use Fone\UserBundle\Manager\AccountManager;
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
        $user = $this->getUser();
        $tm = $this->getTransactionManager();
        $month = $this->getNumericMonth($month);
        $result = $tm->findMostSpentCategoryMonth($user, $month);

        return array('result' => $result[0]);
    }

    /**
     * @Route("/user/transactions", name="transaction_default_get_user_transactions")
     *
     * @return array
     */
    public function getUserTransactionsAction()
    {
        $user = $this->getUser();
        $am = $this->getAccountManager();
        $accounts = $am->findByUser($user);
        $accountIds = array();
        /** @var Account $account */
        foreach ($accounts as $account)
        {
            $accountIds[] = $account->getId();
        }
        $tm = $this->getTransactionManager();
        $transactions = $tm->findByAccountsIds($accountIds);


        return $this->render('TransactionBundle:Default:getUserTransactions.html.twig', array(
            'transactions' => $transactions
        ));

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

    /** @return AccountManager */
    private function getAccountManager()
    {
        return $this->get('user.account_manager');
    }
}