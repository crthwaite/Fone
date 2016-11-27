<?php

namespace Fone\TransactionBundle\DataFixtures\MongoDB;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Fone\TransactionBundle\Document\Transaction;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

class LoadTransactionData extends AbstractFixture implements OrderedFixtureInterface, ContainerAwareInterface
{
    /** @var ContainerInterface $container */
    private $container;

    private $transactions;

    /**
     * Sets the container.
     *
     * @param ContainerInterface|null $container A ContainerInterface instance or null
     */
    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
    }

    /**
     * Load data fixtures with the passed EntityManager
     *
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager)
    {
        $this->initVariables();

        foreach ($this->transactions as $key => $transactionData) {
            $transaction = new Transaction();
            $transaction
                ->setDescription($transactionData['description'])
                ->setState($transactionData['state'])
                ->setCity($transactionData['city'])
                ->setZip($transactionData['zip'])
                ->setAddress($transactionData['address'])
                ->setAmount(floatval($transactionData['amount']))
                ->setPeerActivity($transactionData['peerActivity'])
                ->setPeerName($transactionData['peerName']);

            if (!is_null($transactionData['operationDate'])) {
                $transaction->setOperationDate(new \DateTime($transactionData['operationDate']));
            }

            if (!is_null($transactionData['time'])) {
                $transaction->setTime(strtotime($transactionData['time']));
            }

            if (!is_null($transactionData['lat']) && !is_null($transactionData['lon'])) {
                $transaction->setLat(floatval($transactionData['lat']));
                $transaction->setLon(floatval($transactionData['lon']));
            }

            $transaction->setAccount($this->getReference($transactionData['accountId']));
            $manager->persist($transaction);
        }

        $manager->flush();
    }

    private function initVariables()
    {
        $this->transactions = array();

        $transactionJson = $this->container->get('kernel')->getRootDir() .
            '/../src/Fone/TransactionBundle/DataFixtures/MongoDB/transactions.json';
        $file = fopen($transactionJson, 'r');

        $i = 1;
        while (!feof($file)) {
            $json = json_decode(fgets($file), true);
            if (!is_null($json)) {
                $this->transactions['transaction' . strval($i)] = array(
                    'description' => (array_key_exists('description', $json)) ? $json['description'] : "",
                    'state' => (array_key_exists('peerState', $json)) ? $json['peerState'] : "",
                    'city' => (array_key_exists('peerCity', $json)) ? $json['peerCity'] : "",
                    'zip' => (array_key_exists('peerZip', $json)) ? $json['peerZip'] : "",
                    'address' => (array_key_exists('peerAddress', $json)) ? $json['peerAddress'] : "",
                    'amount' => (array_key_exists('amount', $json)) ? $json['amount'] : 0,
                    'operationDate' => (array_key_exists('operationDate', $json)) ? $json['operationDate'] : null,
                    'time' => (array_key_exists('timeMilis', $json)) ? $json['timeMilis'] : null,
                    'peerActivity' => (array_key_exists('peerActivity', $json)) ? $json['peerActivity'] : "",
                    'peerName' => (array_key_exists('peerName', $json)) ? $json['peerName'] : "",
                    'lat' => array_key_exists('peerLocation', $json) ? $json['peerLocation']['lat'] : null,
                    'lon' => array_key_exists('peerLocation', $json) ? $json['peerLocation']['lon'] : null,
                    'accountId' => array_key_exists('accountId', $json) ? $json['accountId'] : ""
                );
                ++$i;
            }
        }

        fclose($file);
    }

    /**
     * Get the order of this fixture
     *
     * @return integer
     */
    public function getOrder()
    {
        return 3;
    }
}