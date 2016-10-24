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
     * @MongoDB\Int
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
     */
    public function setDescription($description)
    {
        $this->description = $description;
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
     */
    public function setState($state)
    {
        $this->state = $state;
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
     */
    public function setCity($city)
    {
        $this->city = $city;
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
     */
    public function setZip($zip)
    {
        $this->zip = $zip;
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
     */
    public function setAddress($address)
    {
        $this->address = $address;
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
     */
    public function setAmount($amount)
    {
        $this->amount = $amount;
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
     */
    public function setOperationDate($operationDate)
    {
        $this->operationDate = $operationDate;
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
     */
    public function setTime($time)
    {
        $this->time = $time;
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
     */
    public function setPeerActivity($peerActivity)
    {
        $this->peerActivity = $peerActivity;
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
     */
    public function setPeerName($peerName)
    {
        $this->peerName = $peerName;
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
     */
    public function setLat($lat)
    {
        $this->lat = $lat;
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
     */
    public function setLon($lon)
    {
        $this->lon = $lon;
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
     */
    public function setAccount($account)
    {
        $this->account = $account;
    }
}