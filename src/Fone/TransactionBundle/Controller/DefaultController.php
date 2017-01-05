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
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

class DefaultController extends Controller
{
    /**
     * @param $num   integer | null
     * @param $pager integer | null
     *
     * @Route("/user/transactions/{num}/{pager}", name="transaction_default_get_user_transactions", options={"expose"=true})
     * @Method({"POST", "GET"})
     *
     * @return array
     */
    public function getUserTransactionsAction($num = null, $pager = null)
    {
        $user       = $this->getUser();
        $accountIds = $this->_getAccountIds($user);

        $tm = $this->getTransactionManager();

        $transactions = $tm->findByAccountsIds($accountIds, $num, $pager);


        return $this->render('TransactionBundle:Default:getUserTransactions.html.twig', array(
            'transactions' => $transactions
        ));
    }

    /**
     * @param string      $category
     * @param string      $day
     * @param string      $month
     * @param string|null $year
     * @param string|null $num
     * @param string|null $pager
     *
     * @Route(
     *     "/user/transactions/category/date/{category}/{day}/{month}/{year}/{num}/{pager}",
     *      name="transaction_default_get_user_transactions_category_date",
     *      options={"expose"=true}
     *     )
     * @Template()
     *
     * @return array
     */
    public function getTransactionsCategoryDateAction(
        $category,
        $day,
        $month,
        $year = null,
        $num = null,
        $pager = null
    )
    {
        $user       = $this->getUser();
        $accountIds = $this->_getAccountIds($user);

        $tm           = $this->getTransactionManager();
        $transactions = $tm->findTransactionsCategoryDate(
            $accountIds,
            $category,
            intval($day),
            intval($month),
            (is_null($year)) ? null : intval($year),
            $num,
            $pager
        );

        return array("transactions" => $transactions);
    }

    /**
     * @param string        $category
     * @param string | null $num
     * @param string | null $pager
     *
     * @Route(
     *     "/user/transactions/on/category/{category}/{num}/{pager}",
     *      name="transaction_default_get_user_transactions_category",
     *      options={"expose"=true}
     *     )
     * @Template()
     *
     * @return array
     */
    public function getTransactionsCategoryAction($category, $num = null, $pager = null)
    {
        $user       = $this->getUser();
        $accountIds = $this->_getAccountIds($user);

        $tm           = $this->getTransactionManager();
        $transactions = $tm->findTransactionsCategory($accountIds, $category, $num, $pager);

        return array("transactions" => $transactions);
    }

    /**
     * @param string        $day
     * @param string        $month
     * @param string | null $year
     * @param string | null $num
     * @param string | null $pager
     *
     * @Route(
     *     "/user/transactions/in/date/{day}/{month}/{year}/{num}/{pager}",
     *      name="transaction_default_get_user_transactions_date",
     *      options={"expose"=true}
     *     )
     * @Template()
     *
     * @return array
     */
    public function getTransactionsDateAction($day, $month, $year = null, $num = null, $pager = null)
    {
        $user       = $this->getUser();
        $accountIds = $this->_getAccountIds($user);

        $tm           = $this->getTransactionManager();
        $transactions = $tm->findTransactionsDate(
            $accountIds,
            intval($day),
            intval($month),
            (is_null($year)) ? null : intval($year),
            $num,
            $pager
        );

        return array("transactions" => $transactions);
    }

    /**
     * @param string $month
     *
     * @Route(
     *     "/spent/most/category/{month}",
     *     name="transaction_default_spent_category_month",
     *     options={"expose": true}
     * )
     * @Template()
     *
     * @return array
     */
    public function spentMostCategoryMonthAction($month)
    {
        $user       = $this->getUser();
        $accountIds = $this->_getAccountIds($user);

        $month  = $this->getNumericMonth($month);
        $tm     = $this->getTransactionManager();
        $result = $tm->findCategoryMostSpentMonth($accountIds, $month);
        reset($result);

        return array('key' => key($result), 'result' => $result[key($result)]);
    }

    /**
     * @Route(
     *     "/spent/most/day",
     *     name="transaction_default_spent_day",
     *     options={"expose": true}
     * )
     * @Template()
     *
     * @return array
     */
    public function spentMostDayAction()
    {
        $user       = $this->getUser();
        $accountIds = $this->_getAccountIds($user);

        $tm = $this->getTransactionManager();
        $result = $tm->findMostSpentDay($accountIds);

        reset($result);

        return array('key' => key($result), 'result' => $result[key($result)]);
    }

    /**
     * @Route(
     *     "/spent/most/week/day",
     *     name="transaction_default_spent_week_day",
     *     options={"expose": true}
     * )
     * @Template()
     *
     * @return array
     */
    public function spentMostWeekDayAction()
    {
        $user       = $this->getUser();
        $accountIds = $this->_getAccountIds($user);

        $tm = $this->getTransactionManager();
        $result = $tm->findMostSpentWeekDay($accountIds);

        reset($result);

        return array('key' => key($result), 'result' => $result[key($result)]);
    }

    /**
     * @Route(
     *     "/spent/most/month",
     *     name="transaction_default_spent_month",
     *     options={"expose": true}
     * )
     * @Template()
     *
     * @return array
     */
    public function spentMostMonthAction()
    {
        $user       = $this->getUser();
        $accountIds = $this->_getAccountIds($user);

        $tm = $this->getTransactionManager();
        $result = $tm->findMostMonth($accountIds);

        reset($result);

        return array('key' => key($result), 'result' => $result[key($result)]);
    }

    /**
     * @Route(
     *     "/spent/most/year",
     *     name="transaction_default_spent_year",
     *     options={"expose": true}
     * )
     * @Template()
     *
     * @return array
     */
    public function spentMostYearAction()
    {
        $user       = $this->getUser();
        $accountIds = $this->_getAccountIds($user);

        $tm = $this->getTransactionManager();
        $result = $tm->findMostYear($accountIds);

        reset($result);

        return array('key' => key($result), 'result' => $result[key($result)]);
    }

    /**
     * @param string $category
     *
     * @Route("/spent/in-category/{category}", name="transaction_default_spent_incategory", options={"expose": true})
     * @Template()
     *
     * @return array
     */
    public function spentCategoryAction($category)
    {
        $user       = $this->getUser();
        $accountIds = $this->_getAccountIds($user);

        $tm    = $this->getTransactionManager();
        $spent = $tm->findSpentCategory($accountIds, $category);

        return array('category' => $category, 'spent' => $spent);
    }

    /**
     * @param string      $day
     * @param string      $month
     * @param string|null $year
     *
     * @Route(
     *     "/spent/on-date/{day}/{month}/{year}",
     *      name="transaction_default_spent_ondate",
     *      options={"expose": true}
     * )
     * @Template()
     *
     * @return array
     */
    public function spentDateAction($day, $month, $year = null)
    {
        $user       = $this->getUser();
        $accountIds = $this->_getAccountIds($user);

        $tm    = $this->getTransactionManager();
        $spent = $tm->findSpentDate(
            $accountIds,
            intval($day),
            intval($month),
            (is_null($year)) ? null : intval($year)
        );

        return array("spent" => $spent, "day" => $day, "month" => $month, "year" => $year);
    }

    /**
     * @param string      $category
     * @param string      $day
     * @param string      $month
     * @param string|null $year
     * @Route(
     *     "/spent/category/date/{category}/{day}/{month}/{year}",
     *     name="transaction_default_spent_category_date",
     *     options={"expose": true}
     * )
     * @Template()
     *
     * @return array
     */
    public function spentCategoryDateAction($category, $day, $month, $year = null)
    {
        $user       = $this->getUser();
        $accountIds = $this->_getAccountIds($user);

        $tm    = $this->getTransactionManager();
        $spent = $tm->findSpentCategoryDate(
            $accountIds,
            $category,
            intval($day),
            intval($month),
            (is_null($year)) ? null : intval($year)
        );

        return array(
            "category" => $category,
            "day"      => $day,
            "month"    => $month,
            "year"     => $year,
            "spent"    => $spent
        );
    }

    private function getNumericMonth($month)
    {
        $month = strtolower(trim($month));
        $num   = 0;

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

    private function _getAccountIds($user)
    {
        $am         = $this->getAccountManager();
        $accounts   = $am->findByUser($user);
        $accountIds = array();
        /** @var Account $account */
        foreach ($accounts as $account) {
            $accountIds[] = $account->getId();
        }

        return $accountIds;
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