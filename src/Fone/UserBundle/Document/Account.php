<?php
/**
 * Created by PhpStorm.
 * User: christopher
 * Date: 24/10/16
 * Time: 15:53
 */

namespace Fone\UserBundle\Document;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Fone\TransactionBundle\Document\Transaction;

/**
 * @MongoDB\Document(repositoryClass="Fone\UserBundle\Document\Repository\AccountRepository")
 */
class Account
{
    /**
     * @MongoDB\Id(strategy="auto")
     */
    protected $id;

    /**
     * @MongoDB\Float
     */
    protected $amount;

    /**
     * @MongoDB\String
     */
    protected $IBAN;

    /**
     * @var User
     *
     * @MongoDB\ReferenceOne(targetDocument="Fone\UserBundle\Document\User", simple=true, inversedBy="accounts")
     */
    protected $user;

    /**
     * @var ArrayCollection|Transaction[]
     *
     * @MongoDB\ReferenceMany(
     *     targetDocument="Fone\TransactionBundle\Document\Transaction",
     *     simple=true,
     *     mappedBy="account"
     * )
     */
    protected $transactions;

    /**
     * @var array
     *
     * @MongoDB\Hash
     */
    protected $cards;

    public function __construct()
    {
        $this->transactions = new ArrayCollection();
        $this->cards = array();
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return mixed
     */
    public function getAmount()
    {
        return $this->amount;
    }

    /**
     * @param mixed $amount
     *
     * @return $this
     */
    public function setAmount($amount)
    {
        $this->amount = $amount;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getIBAN()
    {
        return $this->IBAN;
    }

    /**
     * @param string $IBAN
     *
     * @return $this
     */
    public function setIBAN($IBAN)
    {
        $this->IBAN = $IBAN;
    }

    /**
     * @return mixed
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @param User $user
     *
     * @return $this
     */
    public function setUser(User $user)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return ArrayCollection| Transaction[]
     */
    public function getTransactions()
    {
        return $this->transactions;
    }

    /**
     * @param ArrayCollection| Transaction[] $transactions
     *
     * @return $this
     */
    public function setTransactions($transactions)
    {
        $this->transactions = $transactions;

        return $this;
    }

    /**
     * @param Transaction $transaction
     * @return $this
     */
    public function addTransaction(Transaction $transaction)
    {
        $this->transactions->add($transaction);

        return $this;
    }

    /**
     * @param Transaction $transaction
     * @return $this
     */
    public function removeTransaction(Transaction $transaction)
    {
        $this->transactions->removeElement($transaction);

        return $this;
    }

    /**
     * @return array
     */
    public function getCards()
    {
        return $this->cards;
    }

    /**
     * @param array $cards
     *
     * @return $this
     */
    public function setCards($cards)
    {
        $this->cards = $cards;

        return $this;
    }

    /**
     * @param string $card
     *
     * @return $this
     */
    public function addCard($card)
    {
        if (array_search($card, $this->cards) === false) {
            $this->cards[] = $card;
        }

        return $this;
    }

    /**
     * @param $card
     *
     * @return $this
     */
    public function removeCard($card)
    {
        if ($key = array_search($card, $this->cards) !== false) {
            unset($this->cards[$key]);
        }

        return $this;
    }

}