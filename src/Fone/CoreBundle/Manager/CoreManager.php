<?php

namespace Fone\CoreBundle\Manager;

use Doctrine\Common\Persistence\ObjectRepository;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\Translation\Translator;

abstract class CoreManager
{
    /** @var DocumentManager $dm */
    protected $dm;

    /** @var $class */
    protected $class;

    /** @var Translator $ranslator */
    protected $translator;

    /** @var Session $session */
    protected $session;

    /** @var ObjectRepository $repository */
    protected $repository;

    public function __construct($class)
    {
        $this->class = $class;
    }

    /**
     * Realiza la persistencia de los cambios realizados sobre las entidades
     */
    public function flush()
    {
        $this->dm->flush();
    }

    /**
     * Persiste un objeto
     *
     * @param      $object
     * @param bool $flush
     *
     * @return void
     */
    public function persist($object, $flush = false)
    {
        $this->dm->persist($object);

        if ($flush) {
            $this->flush();
        }
    }

    /**
     * Elimina un objeto
     *
     * @param      $object
     * @param bool $flush
     *
     * @return void
     */
    public function remove($object, $flush = false)
    {
        $this->dm->remove($object);

        if ($flush) {
            $this->flush();
        }
    }

    /**
     * @return ObjectRepository
     */
    protected function getRepository()
    {
        return $this->repository;
    }

    /**
     * @return DocumentManager
     */
    protected function getManager()
    {
        return $this->dm;
    }

    /**
     * @param DocumentManager $dm
     */
    public function setEntityProperties(DocumentManager $dm)
    {
        $this->dm         = $dm;
        $this->repository = $this->dm->getRepository($this->class);
    }

    /**
     * @param Translator $translator
     */
    public function setTranslator($translator)
    {
        $this->translator = $translator;
    }

    /**
     * @return Translator
     */
    public function getTranslator()
    {
        return $this->translator;
    }

    /**
     * @param Session $session
     */
    public function setSession($session)
    {
        $this->session = $session;
    }

    /**
     * @return Session
     */
    public function getSession()
    {
        return $this->session;
    }
}