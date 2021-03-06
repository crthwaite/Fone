<?php
/**
 * Created by PhpStorm.
 * User: christopher
 * Date: 7/01/17
 * Time: 16:47
 */

namespace Fone\TransactionBundle\Document\Repository;

use Doctrine\ODM\MongoDB\DocumentRepository;

class CategoryRepository extends DocumentRepository
{
    public function findByName($category)
    {
        return $this->createQueryBuilder()
            ->field('name')->equals($category)
            ->getQuery()
            ->execute();
    }
}