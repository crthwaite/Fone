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

    /** @return TransactionRepository */
    protected function getRepository()
    {
        return parent::getRepository();
    }
}