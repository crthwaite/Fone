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
            ->field('account')->in($accountIds);

        if (!is_null($num)) {
            $qb->limit($num);
        }

        if (!is_null($pager)) {
            $qb->skip($num * $pager);
        }

        return $qb->getQuery()->execute();
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