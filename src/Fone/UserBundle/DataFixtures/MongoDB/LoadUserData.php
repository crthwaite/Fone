<?php


namespace Fone\UserBundle\DataFixtures\MongoDB;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Fone\UserBundle\Document\User;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

class LoadUserData extends AbstractFixture implements OrderedFixtureInterface, ContainerAwareInterface
{
    /**
     * @var ContainerInterface
     */
    private $container;

    private $users;

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
     * Get the order of this fixture
     *
     * @return integer
     */
    public function getOrder()
    {
        return 1;
    }

    /**
     * Load data fixtures with the passed EntityManager
     *
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager)
    {
        $this->initVariables();

        foreach ($this->users as $key => $userData) {
            $user = new User();
            $user
                ->setEmail($userData['email'])
                ->setPlainPassword($userData['password'])
                ->setUserName($userData['username'])
                ->setEnabled(true)
                ->setRoles(array('ROLE_USER'));

            $manager->persist($user);
        }

        $manager->flush();
    }

    private function initVariables()
    {
        $this->users = array();

        $customerJson = $this->container->get('kernel')->getRootDir() .
            '/../src/Fone/UserBundle/DataFixtures/MongoDB/customer.json';
        $file = fopen($customerJson, 'r');

        $i = 1;
        while (! feof($file)) {
            $json = json_decode(fgets($file), true);
            $customer = $json['customer'];
            $this->users['user' . strval($i)] = array(
                'email' => $customer['email'],
                'username' => 'user' . strval($i),
                'password' => '12345'
            );

            ++$i;
        }

        fclose($file);
    }
}