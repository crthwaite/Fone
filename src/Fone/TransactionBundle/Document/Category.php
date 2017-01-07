<?php
/**
 * Created by PhpStorm.
 * User: christopher
 * Date: 7/01/17
 * Time: 16:42
 */

namespace Fone\TransactionBundle\Document;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

/**
 * @MongoDB\Document(repositoryClass="Fone\TransactionBundle\Document\Repository\CategoryRepository")
 */
class Category
{
    /**
     * @MongoDB\Id
     */
    protected $id;

    /**
     * @MongoDB\String
     */
    protected $name;

    /**
     * @var ArrayCollection|Category[]
     *
     * @MongoDB\ReferenceMany(
     *     targetDocument="Fone\TransactionBundle\Document\Category",
     *     simple=true,
     *     mappedBy="father"
     * )
     */
    protected $children;

    /**
     * @var Category
     *
     * @MongoDB\ReferenceOne(
     *     targetDocument="Fone\TransactionBundle\Document\Category",
     *     simple=true,
     *     inversedBy="children"
     * )
     */
    protected $father;

    public function __construct()
    {
        $this->children = new ArrayCollection();
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
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return Category
     */
    public function getFather()
    {
        return $this->father;
    }

    /**
     * @param Category $father
     */
    public function setFather($father)
    {
        $this->father = $father;
    }


    /**
     * @return ArrayCollection| Category[]
     */
    public function getChildren()
    {
        return $this->children;
    }

    /**
     * @param ArrayCollection| Category[] $children
     *
     * @return $this
     */
    public function setChildren($children)
    {
        $this->children = $children;

        return $this;
    }

    /**
     * @param Category $category
     * @return $this
     */
    public function addChildren(Category $category)
    {
        $this->children->add($category);

        return $this;
    }

    /**
     * @param Category $category
     * @return $this
     */
    public function removeChildren(Category $category)
    {
        $this->children->removeElement($category);

        return $this;
    }
}