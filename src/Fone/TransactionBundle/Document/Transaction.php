<?php
/**
 * Created by PhpStorm.
 * User: christopher
 * Date: 24/10/16
 * Time: 17:08
 */

namespace Fone\TransactionBundle\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Fone\UserBundle\Document\Account;

/**
 * @MongoDB\Document(repositoryClass="Fone\TransactionBundle\Document\Repository\TransactionRepository")
 */
class Transaction
{
    /**
     * @MongoDB\Id
     */
    protected $id;

    /**
     * @MongoDB\String
     */
    protected $description;

    /**
     * @MongoDB\String
     */
    protected $state;

    /**
     * @MongoDB\String
     */
    protected $city;

    /**
     * @MongoDB\Int
     */
    protected $zip;

    /**
     * @MongoDB\String
     */
    protected $address;

    /**
     * @MongoDB\Float
     */
    protected $amount;

    /**
     * @MongoDB\Date
     */
    protected $operationDate;

    /**
     * @MongoDB\Timestamp
     */
    protected $time;

    /**
     * @MongoDB\String
     */
    protected $peerActivity;

    /**
     * @MongoDB\String
     */
    protected $peerName;

    /**
     * @MongoDB\Float
     */
    protected $lat;

    /**
     * @MongoDB\Float
     */
    protected $lon;

    /**
     * @var Account
     *
     * @MongoDB\ReferenceOne(targetDocument="Fone\UserBundle\Document\Account", simple=true, inversedBy="transactions")
     */
    protected $account;

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
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param mixed $description
     *
     * @return $this
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getState()
    {
        return $this->state;
    }

    /**
     * @param mixed $state
     *
     * @return $this
     */
    public function setState($state)
    {
        $this->state = $state;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getCity()
    {
        return $this->city;
    }

    /**
     * @param mixed $city
     *
     * @return $this
     */
    public function setCity($city)
    {
        $this->city = $city;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getZip()
    {
        return $this->zip;
    }

    /**
     * @param mixed $zip
     *
     * @return $this
     */
    public function setZip($zip)
    {
        $this->zip = $zip;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * @param mixed $address
     *
     * @return $this
     */
    public function setAddress($address)
    {
        $this->address = $address;

        return $this;
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
    public function getOperationDate()
    {
        return $this->operationDate;
    }

    /**
     * @param mixed $operationDate
     *
     * @return $this
     */
    public function setOperationDate($operationDate)
    {
        $this->operationDate = $operationDate;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getTime()
    {
        return $this->time;
    }

    /**
     * @param mixed $time
     *
     * @return $this
     */
    public function setTime($time)
    {
        $this->time = $time;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getPeerActivity()
    {
        return $this->peerActivity;
    }

    /**
     * @param mixed $peerActivity
     *
     * @return $this
     */
    public function setPeerActivity($peerActivity)
    {
        $this->peerActivity = $peerActivity;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getPeerName()
    {
        return $this->peerName;
    }

    /**
     * @param mixed $peerName
     *
     * @return $this
     */
    public function setPeerName($peerName)
    {
        $this->peerName = $peerName;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getLat()
    {
        return $this->lat;
    }

    /**
     * @param mixed $lat
     *
     * @return $this
     */
    public function setLat($lat)
    {
        $this->lat = $lat;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getLon()
    {
        return $this->lon;
    }

    /**
     * @param mixed $lon
     *
     * @return $this
     */
    public function setLon($lon)
    {
        $this->lon = $lon;

        return $this;
    }

    /**
     * @return Account
     */
    public function getAccount()
    {
        return $this->account;
    }

    /**
     * @param Account $account
     *
     * @return $this
     */
    public function setAccount($account)
    {
        $this->account = $account;

        return $this;
    }
}