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

    public function findByAccountsIds($accountIds)
    {
        return $this->getRepository()->findByAccountIds($accountIds);
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

    /** @return TransactionRepository */
    protected function getRepository()
    {
        return parent::getRepository();
    }
}