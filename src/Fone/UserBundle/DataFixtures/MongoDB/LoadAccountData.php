<?php

namespace Fone\UserBundle\DataFixtures\MongoDB;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Fone\UserBundle\Document\Account;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

class LoadAccountData extends AbstractFixture implements OrderedFixtureInterface, ContainerAwareInterface
{
    /** @var  ContainerInterface */
    private $container;

    private $accounts;

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

        foreach ($this->accounts as $key => $accountData) {
            $account = new Account();
            $account
                ->setUser($this->getReference($accountData['user']))
                ->setAmount($accountData['amount'])
                ->setCards($accountData['cards'])
                ->setIBAN($accountData['IBAN']);
            $manager->persist($account);
            $this->setReference($accountData['IBAN'], $account);
            foreach ($accountData['cards'] as $card) {
                $this->setReference($card, $account);
            }
        }

        $manager->flush();
    }

    private function initVariables()
    {
        $this->accounts = array();

        $customerJson = $this->container->get('kernel')->getRootDir() .
            '/../src/Fone/UserBundle/DataFixtures/MongoDB/customer.json';
        $file = fopen($customerJson, 'r');

        $i = 1;
        $j = 1;
        while (! feof($file)) {
            $json = json_decode(fgets($file), true);
            $customerAccount = $json['contracts']['accounts'];
            $customerCreditCards = $json['contracts']['credit_cards'];
            $customerDebitCards = $json['contracts']['debit_cards'];
            foreach ($customerAccount as $account) {
                $this->accounts['account' . strval($j)] = array(
                    'IBAN' => $account['id'],
                    'amount' => $account['amount'],
                    'user' => 'user' . strval($i),
                    'cards' => $this->addCards($account['id'], $customerCreditCards, $customerDebitCards)
                );

                ++$j;
            }

            ++$i;
        }

        fclose($file);
    }

    private function addCards($IBAN, $customerCreditCards, $customerDebitCards)
    {
        $cards = array();

        foreach ($customerCreditCards as $creditCard) {
            if ($creditCard['related_account_id'] == $IBAN) {
                $cards[] = $creditCard['id'];
            }
        }

        foreach ($customerDebitCards as $debitCard) {
            if ($debitCard['related_account_id'] == $IBAN) {
                $cards[] = $debitCard['id'];
            }
        }

        return $cards;
    }

    /**
     * Get the order of this fixture
     *
     * @return integer
     */
    public function getOrder()
    {
        return 2;
    }
}