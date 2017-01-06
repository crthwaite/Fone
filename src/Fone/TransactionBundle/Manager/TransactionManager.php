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

    public function findTransactionsCategoryDate(
        $accountIds,
        $category,
        $day,
        $month,
        $year,
        $num = null,
        $pager = null
    ) {
        if (is_null($year)) {
            $transactions = $this->getRepository()->getSpentCategoryDate(
                $accountIds,
                $category,
                $day,
                $month,
                $num,
                $pager
            );
        } else {
            $transactions = $this->getRepository()->getSpentCategoryFullDate(
                $accountIds,
                $category,
                $day,
                $month,
                $year,
                $num,
                $pager
            );
        }

        return $transactions;
    }

    public function findTransactionsCategory($accountIds, $category, $num, $pager)
    {
        return $this->getRepository()->getSpentCategory($accountIds, $category, $num, $pager);
    }

    public function findTransactionsDate($accountIds, $day, $month, $year, $num, $pager)
    {
        if (is_null($year)) {
            $transactions = $this->getRepository()->getSpentDate($accountIds, $day, $month, $num, $pager);
        } else {
            $transactions = $this->getRepository()->getSpentFullDate($accountIds, $day, $month, $year, $num, $pager);
        }

        return $transactions;
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

    public function findMostSpentDay($accountIds)
    {

        $transactions = $this->getRepository()->findByAccountIds($accountIds);

        $day = array();


        /** @var Transaction $transaction */
        foreach ($transactions as $transaction) {
            /** @var \DateTime $date */
            $date = $transaction->getOperationDate();

            if (isset($day[$date->format('d')])) {
                $day[$date->format('d')] += $transaction->getAmount();
            } else {
                $day[$date->format('d')] = $transaction->getAmount();
            }
        }

        asort($day);

        return $day;
    }

    public function findMostMonth($accountIds)
    {
        $transactions = $this->getRepository()->findByAccountIds($accountIds);

        $month = array();

        /** @var Transaction $transaction */
        foreach ($transactions as $transaction) {
            /** @var \DateTime $date */
            $date = $transaction->getOperationDate();

            if (isset($month[$date->format('F')])) {
                $month[$date->format('F')] += $transaction->getAmount();
            } else {
                $month[$date->format('F')] = $transaction->getAmount();
            }
        }

        asort($month);

        return $month;
    }

    public function findMostYear($accountIds)
    {
        $transactions = $this->getRepository()->findByAccountIds($accountIds);

        $year = array();

        /** @var Transaction $transaction */
        foreach ($transactions as $transaction) {
            /** @var \DateTime $date */
            $date = $transaction->getOperationDate();

            if (isset($year[$date->format('Y')])) {
                $year[$date->format('Y')] += $transaction->getAmount();
            } else {
                $year[$date->format('Y')] = $transaction->getAmount();
            }
        }

        asort($year);

        return $year;
    }

    public function findMostSpentWeekDay($accountIds)
    {
        $transactions = $this->getRepository()->findByAccountIds($accountIds);

        $day = array();

        /** @var Transaction $transaction */
        foreach ($transactions as $transaction) {
            /** @var \DateTime $date */
            $date = $transaction->getOperationDate();

            if (isset($category[$date->format('l')])) {
                $day[$date->format('l')] += $transaction->getAmount();
            } else {
                $day[$date->format('l')] = $transaction->getAmount();
            }
        }

        asort($day);

        return $day;
    }

    public function findSpentDate($accountIds, $day, $month, $year)
    {
        if (is_null($year)) {
            $transactions = $this->getRepository()->getSpentDate($accountIds, $day, $month);
        } else {
            $transactions = $this->getRepository()->getSpentFullDate($accountIds, $day, $month, $year);
        }

        $spent = 0.0;
        /** @var Transaction $transaction */
        foreach ($transactions as $transaction) {
            $spent += $transaction->getAmount();
        }

        return $spent;
    }

    public function findSpentCategory($accountIds, $category)
    {
        $transactions = $this->getRepository()->getSpentCategory($accountIds, $category);

        $spent = 0.0;
        /** @var Transaction $transaction */
        foreach ($transactions as $transaction) {
            $spent += $transaction->getAmount();
        }

        return $spent;
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

    public function findCityMostVisited($accountIds) {
        $transactions = $this->getRepository()->findByAccountIds($accountIds);

        $cities = array();

        /** @var Transaction $transaction */
        foreach ($transactions as $transaction) {
            /** @var \DateTime $date */
            $city = $transaction->getCity();

            if (isset($cities[$city])) {
                $cities[$city] += 1;
            } else {
                $cities[$city] = 1;
            }
        }

        asort($cities);

        return $cities;
    }

    /** @return TransactionRepository */
    protected function getRepository()
    {
        return parent::getRepository();
    }
}