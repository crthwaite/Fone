<?php
/**
 * Created by PhpStorm.
 * User: christopher
 * Date: 24/10/16
 * Time: 17:10
 */

namespace Fone\TransactionBundle\Document\Repository;


use Doctrine\ODM\MongoDB\DocumentRepository;

class TransactionRepository extends DocumentRepository
{
    public function findByAccountIds($accountIds, $num = null, $pager = null)
    {
        $qb = $this->createQueryBuilder()
            ->field('account')->in($accountIds)
            ->sort('operationDate', -1);

        if (!is_null($num)) {
            $qb->limit($num);
        }

        if (!is_null($pager)) {
            $qb->skip($num * $pager);
        }

        return $qb->getQuery()->execute();
    }

    public function getSpentDate($accountIds, $day, $month)
    {
        return $this->createQueryBuilder()
            ->field('account')->in($accountIds)
            ->field('operationDay')->equals($day)
            ->field('operationMonth')->equals($month)
            ->getQuery()
            ->execute();
    }

    public function getSpentFullDate($accountIds, $day, $month, $year)
    {
        return $this->createQueryBuilder()
            ->field('account')->in($accountIds)
            ->field('operationDay')->equals($day)
            ->field('operationMonth')->equals($month)
            ->field('operationYear')->equals($year)
            ->getQuery()
            ->execute();
    }

    public function getSpentCategory($accountIds, $category)
    {
        return $this->createQueryBuilder()
            ->field('account')->in($accountIds)
            ->field('peerActivity')->equals($category)
            ->getQuery()
            ->execute();
    }

    public function getSpentCategoryDate($accountIds, $category, $day, $month)
    {
        return $this->createQueryBuilder()
            ->field('account')->in($accountIds)
            ->field('peerActivity')->equals($category)
            ->field('operationDay')->equals($day)
            ->field('operationMonth')->equals($month)
            ->getQuery()
            ->execute();
    }

    public function getSpentCategoryFullDate($accountIds, $category, $day, $month, $year)
    {
        return $this->createQueryBuilder()
            ->field('account')->in($accountIds)
            ->field('peerActivity')->equals($category)
            ->field('operationDay')->equals($day)
            ->field('operationMonth')->equals($month)
            ->field('operationYear')->equals($year)
            ->getQuery()
            ->execute();
    }

    public function getCategoryMostSpentMonth($accountIds, $month)
    {
        return $this->createQueryBuilder()
            ->field('account')->in($accountIds)
            ->field('operationMonth')->equals($month)
            ->getQuery()
            ->execute();
    }
}