import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Loader2, Cable, Zap } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    // Hide animation after 4 seconds
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Login Successful",
          description: "Welcome back to CCI!",
        });
        navigate('/');
      }
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-industrial-dark relative overflow-hidden">
      {/* Blueprint Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30h30v30H30V30zm15 15v15h15V45H45zm0-15v15h15V30H45z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Animated Logo Section */}
      {showAnimation && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-industrial-dark animate-fade-out" style={{ animationDelay: '3.5s', animationDuration: '0.5s', animationFillMode: 'forwards' }}>
          <div className="text-center">
            {/* Cable Connection Animation */}
            <div className="mb-8 relative">
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-8 bg-gradient-to-r from-accent to-primary rounded-lg animate-pulse-subtle">
                  <Cable className="w-8 h-6 text-white mx-auto mt-1" />
                </div>
                <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent animate-cable-connect"></div>
                <div className="w-12 h-8 bg-gradient-to-l from-accent to-primary rounded-lg">
                  <div className="w-8 h-6 bg-white rounded-sm mx-auto mt-1 animate-pulse-subtle"></div>
                </div>
              </div>
            </div>
            
            {/* Company Branding */}
            <div className="animate-fade-in" style={{ animationDelay: '1s' }}>
              <h1 className="text-6xl font-bold text-transparent bg-gradient-to-r from-white via-accent to-white bg-clip-text mb-2 tracking-wider">
                CCI
              </h1>
              <h2 className="text-xl text-accent font-medium tracking-wide mb-4 animate-glow">
                Chhajer Cable Industry
              </h2>
              <p className="text-muted-foreground text-sm italic">
                Connecting India through reliable cables and patchcords.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Login Form */}
      <div className={`flex items-center justify-center min-h-screen transition-all duration-1000 ${showAnimation ? 'opacity-0' : 'opacity-100'}`}>
        <div className="w-full max-w-md mx-4">
          <div className="bg-card/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl shadow-primary/20">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 mb-4">
                <Zap className="w-6 h-6 text-primary animate-pulse-subtle" />
                <h1 className="text-2xl font-bold text-card-foreground">Welcome Back</h1>
                <Zap className="w-6 h-6 text-primary animate-pulse-subtle" />
              </div>
              <p className="text-muted-foreground text-sm">
                Sign in to access your CCI dashboard
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-card-foreground font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@company.com"
                  className="bg-background/50 border-white/20 focus:border-primary transition-all duration-300 h-12"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-destructive text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-card-foreground font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="bg-background/50 border-white/20 focus:border-primary transition-all duration-300 h-12"
                  {...register('password')}
                />
                {errors.password && (
                  <p className="text-destructive text-sm">{errors.password.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 group"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <Zap className="w-4 h-4 ml-2 group-hover:animate-pulse-subtle" />
                  </>
                )}
              </Button>
            </form>

            {/* Footer Links */}
            <div className="mt-6 text-center space-y-2">
              <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Forgot your password?
              </button>
            </div>

            {/* Company Tagline */}
            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <p className="text-xs text-muted-foreground italic">
                Connecting India through reliable cables and patchcords.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
