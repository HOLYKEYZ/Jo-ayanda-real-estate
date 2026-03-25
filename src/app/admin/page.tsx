"use client";

import { useState, useEffect } from "react";
import { type Property } from "@/data/properties";
import { Plus, Edit, Trash2, LogOut, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Login State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  
  // Data State
  const [properties, setProperties] = useState<Property[]>([]);
  
  // Form State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [formData, setFormData] = useState<Partial<Property>>({
    title: "", description: "", location: "", price: "", type: "house",
    status: "sale", beds: 0, baths: 0, size: "", image: "",
    features: [], amenities: [], yearBuilt: null, area: ""
  });

  // Init
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
      if (res.ok) {
        setProperties(await res.json());
      }
    } catch (err) {
      toast.error("Failed to fetch properties");
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
        setLoginError("Invalid email or password");
      }
    } catch (err) {
      setLoginError("An error occurred during login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("nextphase_admin_token");
    setIsAuthenticated(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this property?")) return;
    
    try {
      const res = await fetch(`/api/properties/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProperties(properties.filter(p => p.id !== id));
        toast.success("Property deleted");
      } else {
        toast.error("Failed to delete property");
      }
    } catch (err) {
      toast.error("An error occurred");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare data
    const payload = {
      ...formData,
      features: typeof formData.features === 'string' 
        ? (formData.features as string).split(',').map(s => s.trim()).filter(Boolean)
        : formData.features,
      amenities: typeof formData.amenities === 'string'
        ? (formData.amenities as string).split(',').map(s => s.trim()).filter(Boolean)
        : formData.amenities,
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
        const savedProperty = await res.json();
        if (editingProperty) {
          setProperties(properties.map(p => p.id === savedProperty.id ? savedProperty : p));
        } else {
          setProperties([...properties, savedProperty]);
        }
        setIsDialogOpen(false);
        toast.success(editingProperty ? "Property updated" : "Property added");
      } else {
        toast.error("Failed to save property");
      }
    } catch (err) {
      toast.error("An error occurred");
    }
  };

  const openNewDialog = () => {
    setEditingProperty(null);
    setFormData({
      title: "", description: "", location: "", price: "", type: "house",
      status: "sale", beds: 0, baths: 0, size: "", image: "/images/property.jpg",
      features: [], amenities: [], yearBuilt: null, area: ""
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (property: Property) => {
    setEditingProperty(property);
    setFormData({
      ...property,
      // Convert arrays to comma-separated strings for easy editing
      features: property.features.join(", ") as unknown as string[],
      amenities: property.amenities.join(", ") as unknown as string[],
    });
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return <div className="flex h-[60vh] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-blue-600" /></div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <CardDescription>Enter your credentials to manage properties</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input type="email" required value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input type="password" required value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              {loginError && <p className="text-sm text-red-500">{loginError}</p>}
              <Button type="submit" className="w-full bg-blue-600">Login</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your real estate listings</p>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={openNewDialog} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" /> Add Property
          </Button>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 dark:bg-slate-950/50 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {properties.map(property => (
                <tr key={property.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{property.title}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{property.location}</td>
                  <td className="px-6 py-4 font-medium">{property.price}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
                      {property.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(property)}>
                        <Edit className="h-4 w-4 text-blue-600" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(property.id)}>
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {properties.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">No properties found. Add one to get started.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProperty ? "Edit Property" : "Add New Property"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-6 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title *</label>
                <Input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Price *</label>
                <Input required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Location *</label>
                <Input required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Image URL Path *</label>
                <Input required value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} placeholder="/images/property.jpg" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as Property["type"]})}>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="commercial">Commercial</option>
                  <option value="land">Land</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as Property["status"]})}>
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                  <option value="lease">For Lease</option>
                </select>
              </div>
              
              <div className="grid grid-cols-3 gap-4 md:col-span-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Beds</label>
                  <Input type="number" min="0" value={formData.beds} onChange={e => setFormData({...formData, beds: parseInt(e.target.value) || 0})} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Baths</label>
                  <Input type="number" min="0" value={formData.baths} onChange={e => setFormData({...formData, baths: parseInt(e.target.value) || 0})} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Size/Area</label>
                  <Input value={formData.size} onChange={e => setFormData({...formData, size: e.target.value})} placeholder="e.g. 2 Plots" />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Description *</label>
                <textarea 
                  required 
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Features (comma separated)</label>
                <Input value={(formData.features as unknown as string) || ""} onChange={e => setFormData({...formData, features: e.target.value as unknown as string[]})} placeholder="Pool, Garage, Garden" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Amenities (comma separated)</label>
                <Input value={(formData.amenities as unknown as string) || ""} onChange={e => setFormData({...formData, amenities: e.target.value as unknown as string[]})} placeholder="C of O, Fenced" />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Save Property</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
