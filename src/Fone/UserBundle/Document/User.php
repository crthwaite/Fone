<?php

namespace Fone\UserBundle\Document;

use Doctrine\Common\Collections\ArrayCollection;
use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * @MongoDB\Document(repositoryClass="Fone\UserBundle\Document\Repository\UserRepository")
 */
class User extends BaseUser
{
    const ROLE_ADMIN = 'ROLE_ADMIN';
    const ROLE_USER = 'ROLE_USER';

    /**
     * @MongoDB\Id(strategy="auto")
     */
    protected $id;

    protected $roles;

    /**
     * @var ArrayCollection|Account[]
     *
     * @MongoDB\ReferenceMany(
     *     targetDocument="Fone\UserBundle\Document\Account",
     *     simple=true,
     *     mappedBy="user",
     *     cascade="persist"
     * )
     */
    protected $accounts;

    public function __construct()
    {
        parent::__construct();
        $this->accounts = new ArrayCollection();
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return array
     */
    public function getRoles()
    {
        return $this->roles;
    }

    /**
     * @param array $roles
     * @return User
     */
    public function setRoles(array $roles)
    {
        $this->roles = array();

        foreach ($roles as $role) {
            $this->addRole($role);
        }

        return $this;
    }


    /**
     * @return ArrayCollection | Account[]
     */
    public function getAccounts()
    {
        return $this->accounts;
    }

    /**
     * @param ArrayCollection | Account[] $accounts
     */
    public function setAccounts($accounts)
    {
        $this->accounts = $accounts;
    }

    /**
     * @param Account $account
     * @return User
     */
    public function addAccount(Account $account)
    {
        $this->accounts->add($account);

        return $this;
    }

    /**
     * @param Account $account
     * @return User
     */
    public function removeAccount(Account $account)
    {
        $this->accounts->removeElement($account);

        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * @param \DateTime $createdAt
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;
    }

    /**
     * @return \DateTime
     */
    public function getModifiedAt()
    {
        return $this->modifiedAt;
    }

    /**
     * @param \DateTime $modifiedAt
     */
    public function setModifiedAt($modifiedAt)
    {
        $this->modifiedAt = $modifiedAt;
    }
}