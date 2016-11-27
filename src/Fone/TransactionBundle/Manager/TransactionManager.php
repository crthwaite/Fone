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

    public function findMostSpentCategoryMonth($month)
    {
        $transactions = $this->getRepository()->findAll();
        $filter = array();

        /** @var Transaction $transaction */
        foreach ($transactions as $transaction) {
            /** @var \DateTime $date */
            $date = $transaction->getOperationDate();
            if ($date->format('n') == $month) {
                if (!is_null($transaction->getPeerActivity()) && $transaction->getPeerActivity() != "") {
                    if (array_key_exists($transaction->getPeerActivity(), $filter)) {
                        $filter[$transaction->getPeerActivity()] += $transaction->getAmount();
                    } else {
                        $filter[$transaction->getPeerActivity()] = $transaction->getAmount();
                    }
                }
            }
        }

        $filter = asort($filter);

        return $filter;
    }

    /** @return TransactionRepository */
    protected function getRepository()
    {
        return parent::getRepository();
    }
}