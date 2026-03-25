"use client";

import { useState, useEffect } from "react";
import { type Property } from "@/data/properties";
import { Plus, Pencil, Trash2, LogOut, Loader2, ArrowLeft, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // data state
  const [properties, setProperties] = useState<Property[]>([]);

  // form state
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [formData, setFormData] = useState({
    title: "", description: "", location: "", price: "", type: "house" as string,
    status: "sale" as string, beds: 0, baths: 0, size: "", image: "/images/property.jpg",
    features: "", amenities: "", area: ""
  });

  useEffect(() => {
    const token = localStorage.getItem("nextphase_admin_token");
    if (token) {
      setIsAuthenticated(true);
      fetchProperties();
    }
    setIsLoading(false);
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await fetch("/api/properties");
      if (res.ok) setProperties(await res.json());
    } catch {
      toast.error("Could not load properties");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("nextphase_admin_token", data.token);
        setIsAuthenticated(true);
        fetchProperties();
      } else {
        setLoginError("Wrong email or password. Please try again.");
      }
    } catch {
      setLoginError("Something went wrong. Check your internet and try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("nextphase_admin_token");
    setIsAuthenticated(false);
    setShowForm(false);
  };

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/properties/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProperties(properties.filter(p => p.id !== id));
        toast.success(`"${title}" has been deleted`);
      } else {
        toast.error("Could not delete. Please try again.");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      features: formData.features.split(',').map(s => s.trim()).filter(Boolean),
      amenities: formData.amenities.split(',').map(s => s.trim()).filter(Boolean),
      yearBuilt: null,
    };

    try {
      const url = editingProperty ? `/api/properties/${editingProperty.id}` : "/api/properties";
      const method = editingProperty ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const saved = await res.json();
        if (editingProperty) {
          setProperties(properties.map(p => p.id === saved.id ? saved : p));
          toast.success(`"${saved.title}" updated successfully`);
        } else {
          setProperties([...properties, saved]);
          toast.success(`"${saved.title}" added successfully`);
        }
        setShowForm(false);
        setEditingProperty(null);
      } else {
        toast.error("Could not save. Please check your details and try again.");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const openNewForm = () => {
    setEditingProperty(null);
    setFormData({
      title: "", description: "", location: "", price: "", type: "house",
      status: "sale", beds: 0, baths: 0, size: "", image: "/images/property.jpg",
      features: "", amenities: "", area: ""
    });
    setShowForm(true);
  };

  const openEditForm = (property: Property) => {
    setEditingProperty(property);
    setFormData({
      title: property.title,
      description: property.description,
      location: property.location,
      price: property.price,
      type: property.type,
      status: property.status,
      beds: property.beds,
      baths: property.baths,
      size: property.size,
      image: property.image,
      features: property.features.join(", "),
      amenities: property.amenities.join(", "),
      area: property.area || ""
    });
    setShowForm(true);
  };

  // loading
  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  // login screen
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-4">
        <Card className="w-full max-w-sm">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>Sign in to manage your properties</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="h-12 text-base"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="h-12 text-base"
                />
              </div>
              {loginError && (
                <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                  {loginError}
                </p>
              )}
              <Button type="submit" className="w-full h-12 text-base bg-blue-600 hover:bg-blue-700 font-semibold">
                Sign In
              </Button>
              <div className="text-center pt-2">
                <Link href="/" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
                  ← Back to website
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // property form
  if (showForm) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => { setShowForm(false); setEditingProperty(null); }}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {editingProperty ? `Editing: ${editingProperty.title}` : "Add New Property"}
          </h1>
        </div>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <form onSubmit={handleSave} className="space-y-5">
              {/* title */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold">Property Name *</label>
                <Input
                  required
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g. 4 Bedroom Bungalow"
                  className="h-12 text-base"
                />
              </div>

              {/* price + location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold">Price *</label>
                  <Input
                    required
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                    placeholder="e.g. ₦40M or Contact for Price"
                    className="h-12 text-base"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold">Location *</label>
                  <Input
                    required
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                    placeholder="e.g. GRA, Ilorin"
                    className="h-12 text-base"
                  />
                </div>
              </div>

              {/* type + status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold">Property Type</label>
                  <select
                    className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base"
                    value={formData.type}
                    onChange={e => setFormData({...formData, type: e.target.value})}
                  >
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="commercial">Commercial</option>
                    <option value="land">Land</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold">Listing Type</label>
                  <select
                    className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base"
                    value={formData.status}
                    onChange={e => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                    <option value="lease">For Lease</option>
                  </select>
                </div>
              </div>

              {/* beds, baths, size */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold">Bedrooms</label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.beds}
                    onChange={e => setFormData({...formData, beds: parseInt(e.target.value) || 0})}
                    className="h-12 text-base"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold">Bathrooms</label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.baths}
                    onChange={e => setFormData({...formData, baths: parseInt(e.target.value) || 0})}
                    className="h-12 text-base"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold">Land Size</label>
                  <Input
                    value={formData.size}
                    onChange={e => setFormData({...formData, size: e.target.value})}
                    placeholder="e.g. 2 Plots"
                    className="h-12 text-base"
                  />
                </div>
              </div>

              {/* description */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold">Description *</label>
                <textarea
                  required
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  rows={4}
                  placeholder="Describe the property..."
                />
              </div>

              {/* image upload */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold">Property Image</label>
                <div className="flex items-start sm:items-center gap-4 flex-col sm:flex-row">
                  {formData.image && (
                    <div className="relative w-full sm:w-20 h-32 sm:h-20 shrink-0 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-slate-50">
                      <Image src={formData.image} alt="Preview" fill className="object-cover" />
                    </div>
                  )}
                  <div className="flex-1 w-full relative">
                    <Input
                      type="file"
                      accept="image/jpeg, image/png, image/webp"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        
                        const toastId = toast.loading("Uploading image...");
                        const data = new FormData();
                        data.append("file", file);
                        
                        try {
                          const res = await fetch("/api/upload", {
                            method: "POST",
                            body: data,
                          });
                          
                          if (res.ok) {
                            const result = await res.json();
                            setFormData({ ...formData, image: result.path });
                            toast.success("Image uploaded successfully", { id: toastId });
                          } else {
                            toast.error("Failed to upload image", { id: toastId });
                          }
                        } catch (error) {
                          toast.error("Error uploading image", { id: toastId });
                        }
                      }}
                      className="h-12 text-base pt-2.5 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/40 dark:file:text-blue-300"
                    />
                    <p className="text-xs text-slate-500 mt-2">Select a photo to upload. It will replace the current image.</p>
                  </div>
                </div>
              </div>

              {/* features + amenities */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold">Key Features</label>
                  <Input
                    value={formData.features}
                    onChange={e => setFormData({...formData, features: e.target.value})}
                    placeholder="Pool, Garage, Garden"
                    className="h-12 text-base"
                  />
                  <p className="text-xs text-slate-500">Separate with commas</p>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold">Documents/Amenities</label>
                  <Input
                    value={formData.amenities}
                    onChange={e => setFormData({...formData, amenities: e.target.value})}
                    placeholder="C of O, Fenced, Survey Plan"
                    className="h-12 text-base"
                  />
                  <p className="text-xs text-slate-500">Separate with commas</p>
                </div>
              </div>

              {/* buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                <Button type="submit" className="h-12 text-base bg-blue-600 hover:bg-blue-700 font-semibold flex-1 gap-2">
                  <Save className="h-4 w-4" />
                  {editingProperty ? "Save Changes" : "Add Property"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 text-base gap-2"
                  onClick={() => { setShowForm(false); setEditingProperty(null); }}
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // main dashboard
  return (
    <div className="space-y-6">
      {/* header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Your Properties</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">{properties.length} {properties.length === 1 ? 'listing' : 'listings'} total</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button onClick={openNewForm} className="bg-blue-600 hover:bg-blue-700 h-11 text-sm font-semibold flex-1 sm:flex-none gap-2">
            <Plus className="h-4 w-4" /> Add New Property
          </Button>
          <Button variant="outline" onClick={handleLogout} className="h-11 text-sm gap-2">
            <LogOut className="h-4 w-4" /> Sign Out
          </Button>
        </div>
      </div>

      {/* property cards */}
      <div className="grid gap-4">
        {properties.map(property => (
          <div
            key={property.id}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden hover:border-blue-200 dark:hover:border-blue-800 transition-colors"
          >
            <div className="flex flex-col sm:flex-row">
              {/* thumbnail */}
              <div className="relative w-full sm:w-40 h-40 sm:h-auto shrink-0">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 160px"
                />
              </div>

              {/* details */}
              <div className="flex-1 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg truncate">
                    {property.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm truncate mt-1">
                    {property.location}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="font-bold text-blue-600 dark:text-blue-400 text-sm">
                      {property.price}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wide bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                      For {property.status}
                    </span>
                  </div>
                </div>

                {/* actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditForm(property)}
                    className="h-10 px-4 gap-2 text-sm"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(property.id, property.title)}
                    className="h-10 px-4 gap-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-200 dark:border-red-800"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {properties.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <p className="text-lg text-slate-500 dark:text-slate-400 mb-4">No properties yet</p>
            <Button onClick={openNewForm} className="bg-blue-600 hover:bg-blue-700 gap-2">
              <Plus className="h-4 w-4" /> Add Your First Property
            </Button>
          </div>
        )}
      </div>

      {/* back to site link */}
      <div className="text-center pt-4">
        <Link href="/" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
          ← Back to website
        </Link>
      </div>
    </div>
  );
}
