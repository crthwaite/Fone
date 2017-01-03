<?php

namespace Fone\TransactionBundle\Manager;

use Fone\CoreBundle\Manager\CoreManager;
use Fone\TransactionBundle\Document\Repository\TransactionRepository;
use Fone\TransactionBundle\Document\Transaction;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class TransactionManager extends CoreManager
{
    public function findById($id)
    {
        return $this->getRepository()->findBy(array("id" => $id));
    }

    public function findByAccountsIds($accountIds, $num = null, $pager = null)
    {
        return $this->getRepository()->findByAccountIds($accountIds, $num, $pager);
    }

    public function findCategoryMostSpentMonth($accountIds, $month)
    {
        $transactions = $this->getRepository()->getCategoryMostSpentMonth($accountIds, $month);
        $category = array();
        /** @var Transaction $transaction */
        foreach ($transactions as $transaction) {
            $transCategory = $transaction->getPeerActivity();
            if (is_null($transCategory) or $transCategory == "") {
                $transCategory = "SIN CATEGORIA";
            }

            if (isset($category[$transCategory])) {
                $category[$transCategory] += $transaction->getAmount();
            } else {
                $category[$transCategory] = $transaction->getAmount();
            }
        }

        asort($category);

        return $category;
    }

    public function findSpentCategoryDate($accountIds, $category, $day, $month, $year)
    {
        if (is_null($year)) {
            $transactions = $this->getRepository()->getSpentCategoryDate($accountIds, $category, $day, $month);
        } else {
            $transactions = $this->getRepository()->getSpentCategoryFullDate(
                $accountIds,
                $category,
                $day,
                $month,
                $year
            );
        }

        $spent = 0.0;
        /** @var Transaction $transaction */
        foreach ($transactions as $transaction) {
            $spent += $transaction->getAmount();
        }

        return $spent;
    }

    /** @return TransactionRepository */
    protected function getRepository()
    {
        return parent::getRepository();
    }
}